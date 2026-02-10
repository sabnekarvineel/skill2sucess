const express = require('express');
const CareerProfile = require('../models/CareerProfile');
const Exam = require('../models/Exam');
const { auth, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Add career profile
router.post('/career-profiles', auth, adminOnly, async (req, res) => {
  try {
    const { jobRole, description, requiredSkills, softSkills, avgSalary, jobMarketDemand, learningPath, companies } = req.body;
    
    let profile = await CareerProfile.findOne({ jobRole });
    if (profile) {
      return res.status(400).json({ message: 'Career profile already exists' });
    }
    
    profile = new CareerProfile({
      jobRole,
      description,
      requiredSkills,
      softSkills,
      avgSalary,
      jobMarketDemand,
      learningPath,
      companies
    });
    
    await profile.save();
    res.status(201).json({ message: 'Career profile added', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update career profile
router.put('/career-profiles/:id', auth, adminOnly, async (req, res) => {
  try {
    const profile = await CareerProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Career profile updated', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add exam
router.post('/exams', auth, adminOnly, async (req, res) => {
  try {
    const { examName, examType, eligibility, examDate, applicationDeadline, resultDate, syllabus, applicationLink, preparationResources, difficulty } = req.body;
    
    let exam = await Exam.findOne({ examName });
    if (exam) {
      return res.status(400).json({ message: 'Exam already exists' });
    }
    
    exam = new Exam({
      examName,
      examType,
      eligibility,
      examDate,
      applicationDeadline,
      resultDate,
      syllabus,
      applicationLink,
      preparationResources,
      difficulty
    });
    
    await exam.save();
    res.status(201).json({ message: 'Exam added', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update exam
router.put('/exams/:id', auth, adminOnly, async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Exam updated', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete exam
router.delete('/exams/:id', auth, adminOnly, async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({ message: 'Exam deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
