import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  MoreHoriz as MoreHorizIcon,
  Logout
} from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 210;

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    { text: 'dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'books', icon: <BookIcon />, path: '/admin/books' },
    { text: 'owners', icon: <PeopleIcon />, path: '/admin/owners' },
    { text: 'others', icon: <MoreHorizIcon />, path: '/admin/others' },
  ];

  const secondaryMenuItems = [
    { text: 'notifications', icon: <NotificationsIcon /> },
    { text: 'settings', icon: <SettingsIcon /> },
    { text: 'Login as Book Owner', icon: <PersonIcon /> },
  ]

  const handleListItemClick = (text,path) => {
    setSelectedItem(text);
    navigate(path); 
  };

  return (
    <Box sx={{ display: 'flex', marginRight:'-85px', border:'10px',borderRadius:'40px'}}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#171B36',
            color: '#FFFFFF',
            border: '1px solid #ddd',
            borderRadius: '4px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginRight: '25px', textAlign: 'center' }}>
          <IconButton sx={{ color: '#FFFFFF', fontSize: '1rem' }}>
            <MenuIcon />
          </IconButton>
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.svg"
            alt="Logo"
            style={{
              width: '25px',
              height: '25px',
              marginRight: '15px',
              filter: 'invert(28%) sepia(100%) saturate(7476%) hue-rotate(185deg) brightness(101%) contrast(101%)',
            }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
            Book Title
          </Typography>
        </Box>
        <Divider />
        <List sx={{ lineHeight: '1.5' }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
                <ListItemButton
                    onClick={() => handleListItemClick(item.text,item.path)}
                  sx={{
                     backgroundColor: selectedItem === item.text ? '#3A4F92' : 'inherit',
                     '&:hover': {
                      backgroundColor: '#1E2447',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '35px', color: '#FFFFFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {secondaryMenuItems.map((item)=>(
              <ListItem key={item.text} disablePadding>
               <ListItemButton
                onClick={() => handleListItemClick(item.text,item.path)}
                sx={{
                  backgroundColor: selectedItem === item.text ? '#1E2447' : 'inherit',
                  '&:hover': {
                    backgroundColor: '#1E2447',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '35px', color: '#FFFFFF' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
        sx={{
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop:"200px",
          marginRight:"20px"
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            width: "100%",
            maxWidth: "180px",
            fontSize: "0.875rem",
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "#010101",
            },
          }}
        >
          <Logout sx={{ marginRight: "4px", fontSize: "1rem" }} />
          {"Logout"}
        </Button>
      </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Sidebar;