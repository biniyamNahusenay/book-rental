import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Main from './main/Main'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'

const AdminDashboaard = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'row'}}>
      <Box sx={{height:'85vh'}}>
       <Sidebar/>
      </Box>
      <Outlet/>
    </Box>
  )
}

export default AdminDashboaard
