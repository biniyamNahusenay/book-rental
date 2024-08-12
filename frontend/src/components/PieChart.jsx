import React, { useEffect } from 'react';
import { useGetAllBooksQuery } from '../redux/api/books';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilteredBooks } from '../redux/features/books/bookSlice';

const COLORS = ['#FF0000', '#00FF00', '#0000FF']; // Red, Green, Blue

const CustomPieChartCard = ({data,error,isLoading}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.books) {
      // Dispatch filtered books to the Redux store
      dispatch(setFilteredBooks(data.books));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message || 'Unknown error'}</div>;

  // Ensure books is an array
  const books = Array.isArray(data?.books) ? data.books : [];

  // Count books by category
  const categoryCounts = books.reduce((acc, book) => {
    const { category } = book;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert the counts to the format needed for the pie chart
  const categoryData = Object.keys(categoryCounts).map((category, index) => ({
    name: category,
    value: categoryCounts[category],
    fill: COLORS[index % COLORS.length], // Assign colors to categories
  }));

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      {payload.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px', width: '100%' }}>
              <Box
                  sx={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: entry.payload.fill,
                      marginRight: '8px',
                  }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',marginTop:'4px' }}>
                  <Typography variant="body2" sx={{ fontSize: '10px', color: 'gray',fontWeight:'bold'  }}>
                      {entry.payload.name}
                  </Typography>
                  <Typography sx={{ fontSize: '10px', color: 'gray', marginLeft: 'auto',fontWeight:'bold' }}>
                      {entry.payload.value}
                  </Typography>
              </Box>
          </Box>
      ))}
  </Box>  
    );
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Typography variant="body2" sx={{ fontSize: '10px', fontWeight: 'bold', color: 'gray', marginLeft: '10px' }}>
            Available Books
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '10px', fontWeight: 'bold', color: 'gray', marginRight: '10px' }}>
            Today
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={150} height={150}>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend content={renderLegend} verticalAlign="bottom" height={36} />
          </PieChart>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomPieChartCard;
