import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PieChart from './PieChart'

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
        <PieChart/>
  </React.Fragment>
);

export default function CardPie() {
  return (
      <>  
        <Box sx={{ Width: 70,marginRight:'25px',  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
            <Card variant="outlined">{cardd}</Card>
        </Box>
    </>
  );
}