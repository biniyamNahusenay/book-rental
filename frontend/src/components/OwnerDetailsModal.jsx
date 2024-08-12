import React from 'react';
import { Box, Modal, Typography, Grid } from '@mui/material';

const OwnerDetailsModal = ({ open, onClose, owner }) => {
    if (!owner) return null; // If no owner is selected, don't render the modal

    const { email, location, PhoneNumber } = owner;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="owner-details-modal-title"
            aria-describedby="owner-details-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#f5f5f5',  // Light-gray background
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="p" fontWeight="bold" textAlign="center">
                                Name:
                            </Typography>
                            <Typography variant="body1" component="p" textAlign="center">
                                {email || 'Unknown'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="p" fontWeight="bold" textAlign="center">
                                Email Address:
                            </Typography>
                            <Typography variant="body1" component="p" textAlign="center">
                                {email ? `${email}@example.com` : 'Unknown'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" component="p" fontWeight="bold" textAlign="center">
                                Location:
                            </Typography>
                            <Typography variant="body1" component="p" textAlign="center">
                                {location || 'Unknown Location'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" component="p" fontWeight="bold" textAlign="center">
                                Phone Numbers:
                            </Typography>
                            <Typography variant="body1" component="p" textAlign="center">
                                {PhoneNumber || 'Not Provided'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};

export default OwnerDetailsModal;