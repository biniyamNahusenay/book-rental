import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardd = (
  <React.Fragment>
    <CardContent>
     <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between', gap:'12px'}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          income
        </Typography>
        <Typography sx={{ fontSize: 11,padding:'2px',boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',backgroundColor:'lightGray' }} color="text.secondary" gutterBottom>
          This Month
        </Typography>
      </Box>
      <Divider />
      <Box>
      <Typography
      sx={{ mb: 1.5, display: 'flex', fontWeight: 'bold' }} // Make the text bold
    >
      ETB 9460.00
      <Box
        component="span"
        sx={{
          color: 'red',
          display: 'flex',
          alignItems: 'flex-end', // Align icon and text to the bottom
          marginLeft: '5px',
          fontSize: '12px',
        }}
      >
        <ArrowDownwardIcon sx={{ fontSize: '12px', marginRight: '2px' }} />
        <Box component="span" sx={{ fontSize: '10px', lineHeight: 1 }}>
          1.5%
        </Box>
      </Box>
    </Typography>
        <Typography variant="body2" sx={{fontSize:'10px',marginBottom:'8px'}}>
          Compared to ETB9940 last month
        </Typography>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="body2" sx={{fontSize:'10px',fontWeight:'bold',color:'gray'}}>
            Last Month Income
            </Typography>
            <Typography variant="body2" sx={{fontSize:'10px',fontWeight:'bold',color:'gray'}}>
              ETB 25658.00
            </Typography>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
      <>  
        <Typography variant="body1" component="body1" sx={{color:'black'}}>
          This Month Statistics
        </Typography>
        <Typography variant="body1" component="p" sx={{color:'lightGray',fontSize:'13px',marginBottom:'30px'}}>
        Tue, 14 Nov, 2024, 11:30 AM
        </Typography>
        <Box sx={{ Width: 70,marginRight:'25px',  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
            <Card variant="outlined">{cardd}</Card>
        </Box>
    </>
  );
}