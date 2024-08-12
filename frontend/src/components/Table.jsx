import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, IconButton, Link } from '@mui/material';
import { useGetAllBooksQuery } from '../redux/api/books';
import { useGetAllUsersQuery } from '../redux/api/users'; // Use this to fetch all users
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredBooks } from '../redux/features/books/bookSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function createData(no, bookNo, ownerEmail, status, price, color) {
    return { no: no.toString().padStart(2, '0'), bookNo, ownerEmail, status, price, color };
}

function createDataa(no, bookNo, title, status, price, color) {
    return { no: no.toString().padStart(2, '0'), bookNo, title, status, price, color };
}
const CustomTable = ({data,error,isLoading}) => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    // const { data: booksData, error: booksError, isLoading: booksLoading } = useGetAllBooksQuery();
    const booksData = data
    const booksError = error
    const booksLoading = isLoading

    const { data: usersData } = useGetAllUsersQuery(); // Fetch all users
    const [books, setBooks] = useState([]);
    const [ownerEmails, setOwnerEmails] = useState({}); // Store owner emails

    useEffect(() => {
        if (booksData?.books && usersData?.users) {
            dispatch(setFilteredBooks(booksData.books));
            setBooks(booksData.books);

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
     
    // Create rows with the fetched owner emails
    const rows = books.map((book, index) => createData(
        index + 1,
        book.bookNo || `Book ${index + 1}`, // Handle bookNo if not available
        ownerEmails[book.ownerId] || 'Unknown', // Use fetched owner email or 'Unknown'
        book.availabilityStatus,
        book.price,
        book.availabilityStatus === 'Available' ? '#00FF00' : '#FF0000' ,// Example color based on status

    ));
   console.log(books)
    const ownersRow = books.map((book, index) => createDataa(
        index + 1,
        book.bookNo || `Book ${index + 1}`, // Handle bookNo if not available
        book.title, // Use fetched owner email or 'Unknown'
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
                            {userInfo?.user.role==='Admin'?<TableCell sx={{ color: 'gray' }}>Owner</TableCell>:<TableCell sx={{ color: 'gray' }}>Book Name</TableCell>}
                            <TableCell sx={{ color: 'gray' }}>Status</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Price</TableCell>
                          {userInfo?.user.role==='Owner'?<TableCell sx={{ color: 'gray' }}>Action</TableCell>:''}
                        </TableRow>
                    </TableHead>
                    {userInfo?.user.role==='Admin' ? (
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
                     </TableBody>):(
                          <TableBody>
                          {ownersRow.map((row) => (
                              <TableRow key={row.no}>
                                  <TableCell>{row.no}</TableCell>
                                  <TableCell>
                                      <Button sx={{ backgroundColor: 'lightGray', minWidth: '40px', padding: '1px 1px', color: 'black', fontSize: '11px', fontWeight: 'medium' }}>
                                          {row.bookNo}
                                      </Button>
                                  </TableCell>
                                  <TableCell>{row.title}</TableCell>
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
                                  <TableCell>
                                    <IconButton aria-label="delete" sx={{ color: 'red' }}>
                                       <Link href='/owner/upload' sx={{color:'red'}}><EditIcon /></Link>
                                    </IconButton>
                                    <IconButton aria-label="view">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                              </TableRow>
                          ))}
                         </TableBody>
                     )
                    }
                </Table>
            </TableContainer>
        </>
    );
};

export default CustomTable;