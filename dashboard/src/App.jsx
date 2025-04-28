import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Sidebar from './pages/Sidebar';
import { Box, Toolbar } from '@mui/material';
import TaskTracker from './pages/TaskTracker';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/tasktracker" element={<TaskTracker />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
