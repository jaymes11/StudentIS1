import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#333',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <List sx={{ width: '100%' }}>
          {/* Home Link */}
          <ListItem component={Link} to="/" sx={{ paddingLeft: 3, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {/* Add Student Link */}
          <ListItem component={Link} to="/addstudent" sx={{ paddingLeft: 3, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon>
              <PersonAddIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Add Student" />
          </ListItem>
          <ListItem component={Link} to="/tasktracker" sx={{ paddingLeft: 3, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
            <ListItemIcon>
              <PersonAddIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Task Tracker" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
