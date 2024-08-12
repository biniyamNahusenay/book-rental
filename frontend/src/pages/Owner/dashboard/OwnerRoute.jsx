import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const OwnerRoute = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'row'}}>
      <Box sx={{height:'85vh'}}>
        <Sidebar/>
      </Box>
      <Outlet/>
    </Box>
  )
}

export default OwnerRoute
