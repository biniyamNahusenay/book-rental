import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Switch } from '@mui/material';
import { useGetAllBooksQuery } from '../../redux/api/books';
import { useGetAllUsersQuery } from '../../redux/api/users';
import { useDispatch } from 'react-redux';
import { setFilteredBooks } from '../../redux/features/books/bookSlice';

function createData(no, author, ownerEmail, category, bookName, status, isActive) {
    return { no: no.toString().padStart(2, '0'), author, ownerEmail, category, bookName, status, isActive };
}

const AdminBooks = () => {
    const dispatch = useDispatch();
    const { data: booksData, error: booksError, isLoading: booksLoading } = useGetAllBooksQuery();
    const { data: usersData } = useGetAllUsersQuery(); // Fetch all users
    const [books, setBooks] = useState([]);
    const [ownerEmails, setOwnerEmails] = useState({});

    useEffect(() => {
        if (booksData?.books && usersData?.users) {
            dispatch(setFilteredBooks(booksData.books));
            setBooks(booksData.books);

            // Map owner IDs to emails
            const emails = {};
            usersData.users.forEach(user => {
                const ownerName = user.email.split('@')[0]; 
                emails[user.id] =  ownerName; // Assuming `user.id` matches `ownerId` and `user.email` is the email
            });
            setOwnerEmails(emails);
        }
    }, [booksData, usersData, dispatch]);

    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books data: {booksError.message || 'Unknown error'}</div>;

    const rows = books.map((book, index) => createData(
        index + 1,
        book.author || 'Unknown Author',
        ownerEmails[book.ownerId] || 'Unknown',
        book.category || 'Unknown Category',
        book.title || 'Unknown Name',
        book.availabilityStatus,
        book.availabilityStatus === 'Available'
    ));

    return (
        <Box sx={{ marginTop: '40px', width: '80%', marginLeft: '20px' }}>
            <Typography sx={{ marginTop: '30px', marginBottom: '10px' }}>List of Owner</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'gray' }}>No</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Author</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Owner</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Category</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Book Name</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.no}>
                                <TableCell>{row.no}</TableCell>
                                <TableCell>{row.author}</TableCell>
                                <TableCell>{row.ownerEmail}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.bookName}</TableCell>
                                <TableCell>
                                <Switch
                                        checked={row.isActive}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'status switch' }}
                                        // Customize color if needed
                                        sx={{ 
                                            '& .MuiSwitch-thumb': { 
                                                backgroundColor: row.isActive ? '#4CAF50' : '#F44336' 
                                            } 
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminBooks;