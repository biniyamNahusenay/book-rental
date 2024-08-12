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
import { useGetAllBooksQuery, useGetAllOwnersBookQuery } from '../redux/api/books';
import { useSelector } from 'react-redux';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CardPie() {
  const {userInfo} = useSelector(state=>state.auth)
  const {data:ownersData,error:ownersError,isLoading:ownersLoading} = useGetAllOwnersBookQuery()
  const { data, error, isLoading } = useGetAllBooksQuery();

  const dataToSend = userInfo?.user.role === 'Admin' ? data : ownersData
  const errorToSend = userInfo?.user.role === 'Admin' ? error : ownersError
  const isLoadingToSend = userInfo?.user.role === 'Admin' ? isLoading : ownersLoading

  const cardd = (
    <React.Fragment>
          <PieChart data={dataToSend} error={errorToSend} isLoading={isLoadingToSend}/>
    </React.Fragment>
  );
  return (
      <>  
        <Box sx={{ Width: 70,marginRight:'25px',  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
            <Card variant="outlined">{cardd}</Card>
        </Box>
    </>
  );
}