const bcrypt = require('bcryptjs');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in your environment.');
  process.exit(1);
}
// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify email endpoint
app.get('/api/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});
export default server;