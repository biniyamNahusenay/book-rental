import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useGetAllBooksQuery } from '../redux/api/books';
import { useGetOwnerByIdQuery } from '../redux/api/users'; // Ensure this query is available
import { useDispatch } from 'react-redux';
import { setFilteredBooks } from '../redux/features/books/bookSlice';

function createData(no, bookNo, ownerEmail, status, price, color) {
    return { no: no.toString().padStart(2, '0'), bookNo, ownerEmail, status, price, color };
}

const CustomTable = () => {
    const dispatch = useDispatch();
    const { data: booksData, error: booksError, isLoading: booksLoading } = useGetAllBooksQuery();
    const [books, setBooks] = useState([]);
    const [ownerEmails, setOwnerEmails] = useState({}); // Store owner emails

    useEffect(() => {
        if (booksData?.books) {
            dispatch(setFilteredBooks(booksData.books));
            setBooks(booksData.books);

            // Fetch owner emails
            const ownerIds = [...new Set(booksData.books.map(book => book.ownerId))]; // Unique owner IDs

            const fetchOwnerEmails = async () => {
                const emails = {};
                for (const ownerId of ownerIds) {
                    const { data: ownerData } = await useGetOwnerByIdQuery(ownerId).unwrap();
                    emails[ownerId] = ownerData.email; // Adjust based on your query response
                }
                setOwnerEmails(emails);
            };

            fetchOwnerEmails();
        }
    }, [booksData, dispatch]);

    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books data: {booksError.message || 'Unknown error'}</div>;

    console.log(ownerEmails)
    console.log(books?.ownerId)
    // Create rows with the fetched owner emails
    const rows = books.map((book, index) => createData(
        index + 1,
        book.bookNo || `Book ${index + 1}`, // Handle bookNo if not available
        ownerEmails[book.ownerId] || 'Unknown', // Use fetched owner email or 'Unknown'
        book.availabilityStatus,
        book.price,
        book.availabilityStatus === 'Available' ? '#00FF00' : '#FF0000' // Example color based on status
    ));

    return (
        <>
            <Typography sx={{ marginTop: '30px', marginBottom: '10px' }}>Live Book Status</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'gray' }}>No</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Book No</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Owner</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Status</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.no}>
                                <TableCell>{row.no}</TableCell>
                                <TableCell>
                                    <Button sx={{ backgroundColor: 'lightGray', minWidth: '40px', padding: '1px 1px', color: 'black', fontSize: '11px', fontWeight: 'medium' }}>
                                        {row.bookNo}
                                    </Button>
                                </TableCell>
                                <TableCell>{row.ownerEmail}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: row.color,
                                                marginRight: '8px',
                                            }}
                                        />
                                        <Typography variant="body2">{row.status}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CustomTable;