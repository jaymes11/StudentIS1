import React, { useState, useEffect, useRef } from 'react';
import {
  TextField, Button, Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    idNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    course: '',
    year: ''
  });

  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const idNumberRef = useRef(null);
  const firstNameRef = useRef(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:1337/fetchstudents");
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setTimeout(() => idNumberRef.current?.focus(), 100);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    clearForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      idNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      course: '',
      year: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idNumber: formData.idNumber,
      name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
      age: parseInt(formData.year),
      course: formData.course,
    };

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:1337/editstudent/${formData.idNumber}`,
          payload
        );
        if (response.data.success) {
          setStudents(students.map(student =>
            student.idNumber === formData.idNumber ? response.data.data : student
          ));
        }
      } else {
        const response = await axios.post("http://localhost:1337/addstudent", payload);
        if (response.data.success) {
          setStudents([...students, response.data.data]);
        }
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  const handleDeleteStudent = async (idNumber) => {
    try {
      const response = await axios.delete(`http://localhost:1337/deletestudent/${idNumber}`);
      if (response.data.success) {
        setStudents(students.filter(s => s.idNumber !== idNumber));
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    const [firstName = '', middleName = '', lastName = ''] = student.name.split(' ');
    setFormData({
      idNumber: student.idNumber,
      firstName,
      middleName,
      lastName,
      course: student.course,
      year: student.age.toString()
    });
    setIsEditing(true);
    setOpenModal(true);
    setTimeout(() => firstNameRef.current?.focus(), 100);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Student Information System</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add New Student
        </Button>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth label="ID Number" name="idNumber" value={formData.idNumber}
              onChange={handleInputChange} sx={{ mb: 2 }} inputRef={idNumberRef} disabled={isEditing}
            />
            <TextField
              fullWidth label="First Name" name="firstName" value={formData.firstName}
              onChange={handleInputChange} sx={{ mb: 2 }} inputRef={firstNameRef}
            />
            <TextField
              fullWidth label="Middle Name" name="middleName" value={formData.middleName}
              onChange={handleInputChange} sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="Last Name" name="lastName" value={formData.lastName}
              onChange={handleInputChange} sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="Course" name="course" value={formData.course}
              onChange={handleInputChange} sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="Year" name="year" value={formData.year}
              onChange={handleInputChange} sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditing ? 'Update Student' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.idNumber}>
                <TableCell>{student.idNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteStudent(student.idNumber)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddStudent;
