import React from 'react'
import {Box,Container,Stack} from "@mui/material"
import CustomTable from '../../../../components/Table'
import ZigZagLineChart from '../../../../components/ZigZagLineChart'
import Card from '../../../../components/Card'
import CardPie from '../../../../components/CardPie'
import { useGetAllOwnersBookQuery } from '../../../../redux/api/books'

const OwnersMain = () => {
  const {data,error,isLoading} = useGetAllOwnersBookQuery()
  return (
        <Stack>
           <Box sx={{
                width: '1160px',padding: '10px',marginTop: '13px',backgroundColor: 'white',color: '#000000',
               fontSize: '1rem', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:'10px',marginBottom:'12px'
              }}>
              Owner/Dashboard
           </Box>
             <Box sx={{display:'flex', gap:'10px'}}>
              <Box
                  sx={{
                    width: '280px',   
                    height: '88vh',          
                    color: '#FFFFFF',        
                    padding: '20px',         
                    boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.2)',  
                    display: 'flex',         
                    flexDirection: 'column', 
                    borderRadius:'8px',
                    gap:'27px'
                  }}
                 >
                <Card/>
                <CardPie/>
               </Box>
               <Box sx={{ height: '86vh', display: 'flex', flexDirection: 'column', marginLeft: '6px',width:'60vw',overflow:'hidden'}}>
                  <Box
                    sx={{
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      marginBottom: '10px',
                      padding: '16px',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      flex:'3',
                      width:'100%',
                      marginTop:'-20px'
                    }}>
                    <CustomTable data={data} error={error} isLoading={isLoading}/>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '16px',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      flex:'2',
                      width:'100%',
                      marginTop:'-17px'
                    }}>
                    <ZigZagLineChart/>
                  </Box>
                </Box>
            </Box>
        </Stack>
  )
}

export default OwnersMain