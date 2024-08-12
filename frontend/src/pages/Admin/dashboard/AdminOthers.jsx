import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Switch, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetAllBooksQuery } from '../../../redux/api/books';
import { useGetAllUsersQuery, useApproveOwnerMutation, useDeleteUserMutation } from '../../../redux/api/users';
import { useDispatch } from 'react-redux';
import { setFilteredBooks } from '../../../redux/features/books/bookSlice';
import { useParams } from 'react-router-dom';
import OwnerDetailsModal from '../../../components/OwnerDetailsModal';

function createData(no, author, ownerId, ownerEmail, location, bookName, uploadCount, status, isActive, isApproved, owner) {
    return { no: no.toString().padStart(2, '0'), author, ownerId, ownerEmail, location, bookName, uploadCount, status, isActive, isApproved, owner };
}

const AdminOthers = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: booksData, error: booksError, isLoading: booksLoading } = useGetAllBooksQuery();
    const { data: usersData } = useGetAllUsersQuery(); // Fetch all users
    const [books, setBooks] = useState([]);
    const [ownerDetails, setOwnerDetails] = useState({});
    const [approveOwner] = useApproveOwnerMutation(); // Get mutation function
    const [deleteUser] = useDeleteUserMutation(); // Add delete mutation function
    const [openModal, setOpenModal] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);

    useEffect(() => {
        if (booksData?.books && usersData?.users) {
            dispatch(setFilteredBooks(booksData.books));
            setBooks(booksData.books);

            // Count books per owner and gather other details
            const ownerBookCount = {};
            const ownerLocation = {};
            
            booksData.books.forEach(book => {
                if (book.ownerId) {
                    ownerBookCount[book.ownerId] = (ownerBookCount[book.ownerId] || 0) + 1;
                    if (!ownerLocation[book.ownerId]) {
                        // Store the location of the first book uploaded by the owner
                        ownerLocation[book.ownerId] = book.location || 'Unknown Location'; 
                    }
                }
            });

            // Map owner IDs to details including count of uploaded books
            const detailsMap = {};
            usersData.users.forEach(user => {
                detailsMap[user.id] = {
                    email: user.email.split('@')[0],
                    location: user.location || 'Unknown Location',
                    uploadCount: ownerBookCount[user.id] || 0,
                    isApproved: user.approved || false, // Assuming `approved` field exists in usersData
                    PhoneNumber: user.PhoneNumber || 'Not Provided'
                };
            });
            setOwnerDetails(detailsMap);
        }
    }, [booksData, usersData, dispatch]);

    if (booksLoading) return <div>Loading books...</div>;
    if (booksError) return <div>Error loading books data: {booksError.message || 'Unknown error'}</div>;

    const handleApprove = async (ownerId) => {
        try {
            await approveOwner({ id: ownerId, data: { approved: true } });
            // Manually update the UI or refetch data if necessary
            setOwnerDetails(prevDetails => ({
                ...prevDetails,
                [ownerId]: {
                    ...prevDetails[ownerId],
                    isApproved: true
                }
            }));
        } catch (error) {
            console.error("Failed to approve owner:", error);
        }
    };

    const handleDelete = async (ownerId) => {
        try {
            await deleteUser(ownerId);
            // Manually update the UI or refetch data if necessary
            setOwnerDetails((prevDetails) => {
                const updatedDetails = { ...prevDetails };
                delete updatedDetails[ownerId];
                return updatedDetails;
            });
        } catch (error) {
            console.error("Failed to delete owner:", error);
        }
    };

    const handleViewClick = (owner) => {
        setSelectedOwner(owner);
        setOpenModal(true);
    };    
    
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOwner(null);
    };

    const rows = Object.keys(ownerDetails).map((ownerId, index) => createData(
        index + 1,
        'Author Placeholder',
        ownerId,
        ownerDetails[ownerId].email || 'Unknown Owner',
        ownerDetails[ownerId].location || 'Unknown Location',
        'Book Name Placeholder',
        ownerDetails[ownerId].uploadCount || 0,
        'Status Placeholder',
        true,
        ownerDetails[ownerId].isApproved || false,
        ownerDetails[ownerId] // Pass the entire owner object here
    ));    

    return (
        <Box sx={{ marginTop: '40px', width: '80%', marginLeft: '20px' }}>
            <Typography sx={{ marginTop: '30px', marginBottom: '10px' }}>List of Owners</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'gray' }}>No</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Owner</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Upload Count</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Location</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Status</TableCell>
                            <TableCell sx={{ color: 'gray' }}>Action</TableCell>
                            <TableCell sx={{ color: 'gray' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.no}>
                                <TableCell>{row.no}</TableCell>
                                <TableCell>{row.ownerEmail}</TableCell>
                                <TableCell>{row.uploadCount}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.isActive}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'status switch' }}
                                        sx={{ 
                                            '& .MuiSwitch-thumb': { 
                                                backgroundColor: row.isActive ? '#4CAF50' : '#F44336' 
                                            } 
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" sx={{ color: 'red' }} onClick={() => handleDelete(row.ownerId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="view" onClick={() => handleViewClick(row.owner)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        disabled={row.isApproved} // Disable the button if approved
                                        onClick={() => handleApprove(row.ownerId)} // Pass the ownerId to handleApprove
                                    >
                                        Approve
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <OwnerDetailsModal open={openModal} onClose={handleCloseModal} owner={selectedOwner} />
        </Box>
    );
};

export default AdminOthers;