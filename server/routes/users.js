const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Update user skills
router.put('/skills', auth, async (req, res) => {
  try {
    const { programming, databases, frameworks, tools, softSkills, other } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        skills: { programming, databases, frameworks, tools, softSkills, other: other || [] },
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    res.json({ message: 'Skills updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update interests
router.put('/interests', auth, async (req, res) => {
  try {
    const { interests } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { interests, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json({ message: 'Interests updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update hobbies
router.put('/hobbies', auth, async (req, res) => {
  try {
    const { hobbies } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { hobbies, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json({ message: 'Hobbies updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
