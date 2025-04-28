const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const mongoURI = 'mongodb://localhost:27017/studentis';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const studentSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

app.get("/fetchstudents", async (req, res) => {
  try {
    const students = await Student.find();
    console.log('Fetched students:', students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/addstudent", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
/*
app.post("/addstudent", async (req, res) => {
  try {
    const { idNumber, name, age, course } = req.body;

    const newStudent = new Student({ 
      idNumber, 
      name, 
      age, 
      course, 
    });

    await newStudent.save();
    return res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
*/




app.put("/editstudent/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { idNumber: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/deletestudent/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ idNumber: req.params.id });
    if (!deletedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: deletedStudent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const fetchStudents = async () => {
  try {
    const response = await axios.get("http://localhost:1337/fetchstudents");
    setStudents(response.data);
  } catch (error) {
    console.error('Error fetching students:', error.response?.data || error.message);
    alert('Failed to fetch students. Check the console for details.');
  }
};

const port = 1337;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
