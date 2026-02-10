const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const CareerProfile = require('../models/CareerProfile');
const Exam = require('../models/Exam');
const { generateComprehensiveReport } = require('../utils/reportGenerator');

/**
 * GET /api/report/generate
 * Generate comprehensive career suitability report
 * Requires: Authentication
 */
router.get('/generate', auth, async (req, res) => {
  try {
    // Get current user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all career profiles
    const careerProfiles = await CareerProfile.find();
    if (careerProfiles.length === 0) {
      return res.status(400).json({ message: 'Career profiles not configured' });
    }

    // Get all exams
    const exams = await Exam.find();

    // Generate comprehensive report
    const report = generateComprehensiveReport(user, careerProfiles, exams);

    // Save report metadata to user (optional - for tracking)
    // Initialize careerRecommendations if it doesn't exist
    if (!user.careerRecommendations) {
      user.careerRecommendations = {
        jobRoles: [],
        higherStudies: [],
        entranceExams: [],
        skillGaps: []
      };
    }
    
    user.careerRecommendations.jobRoles = report.careerRolesSuitability.map(role => ({
      role: role.jobRole,
      suitabilityScore: role.suitabilityScore,
      matchingSkills: Array.isArray(user.skills.programming) ? user.skills.programming : [],
      missingSkills: role.skillGap && role.skillGap.missingSkills ? role.skillGap.missingSkills : [],
      recommendations: role.learningPath && Array.isArray(role.learningPath) ? role.learningPath : []
    }));
    user.careerRecommendations.higherStudies = report.higherStudiesOptions ? report.higherStudiesOptions.map(option => option.program) : [];
    user.careerRecommendations.entranceExams = report.entranceExams ? report.entranceExams.map(exam => exam.examName) : [];
    user.careerRecommendations.skillGaps = report.skillGapAnalysis && report.skillGapAnalysis.focusAreas ? report.skillGapAnalysis.focusAreas : [];
    
    await user.save();

    res.json(report);
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

/**
 * GET /api/report/pdf
 * Generate PDF version of the report (placeholder)
 */
router.get('/pdf', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const careerProfiles = await CareerProfile.find();
    const exams = await Exam.find();

    const report = generateComprehensiveReport(user, careerProfiles, exams);

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="career-report.json"');
    
    res.json(report);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
});

/**
 * GET /api/report/summary
 * Get quick summary without full report
 */
router.get('/summary', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const careerProfiles = await CareerProfile.find();

    const report = generateComprehensiveReport(user, careerProfiles, []);

    const summary = {
      studentName: report.studentProfile.name,
      degree: report.studentProfile.degree,
      cgpa: report.studentProfile.cgpa,
      skillsCount: report.overallSkillAnalysis.totalSkillsAcquired,
      averageSuitability: report.overallSkillAnalysis.averageSuitabilityScore,
      topCareerRole: report.overallSkillAnalysis.topRoles[0],
      recommendedHigherStudies: report.higherStudiesOptions.map(opt => ({
        program: opt.program,
        suitability: opt.suitability
      })),
      keyFocusAreas: report.skillGapAnalysis.focusAreas
    };

    res.json(summary);
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ message: 'Error generating summary', error: error.message });
  }
});

/**
 * GET /api/report/career/:roleId
 * Get detailed analysis for a specific career role
 */
router.get('/career/:roleName', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const careerProfiles = await CareerProfile.find();

    const report = generateComprehensiveReport(user, careerProfiles, []);

    const roleAnalysis = report.careerRolesSuitability.find(
      role => role.jobRole.toLowerCase() === decodeURIComponent(req.params.roleName).toLowerCase()
    );

    if (!roleAnalysis) {
      return res.status(404).json({ message: 'Career role not found' });
    }

    res.json(roleAnalysis);
  } catch (error) {
    console.error('Career analysis error:', error);
    res.status(500).json({ message: 'Error fetching career analysis', error: error.message });
  }
});

/**
 * GET /api/report/higher-studies
 * Get higher studies recommendations
 */
router.get('/higher-studies', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const careerProfiles = await CareerProfile.find();

    const report = generateComprehensiveReport(user, careerProfiles, []);

    res.json({
      recommendations: report.higherStudiesOptions,
      averageSuitability: report.overallSkillAnalysis.averageSuitabilityScore
    });
  } catch (error) {
    console.error('Higher studies error:', error);
    res.status(500).json({ message: 'Error fetching higher studies options', error: error.message });
  }
});

/**
 * GET /api/report/exams
 * Get entrance exam recommendations
 */
router.get('/exams', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const careerProfiles = await CareerProfile.find();

    const report = generateComprehensiveReport(user, careerProfiles, []);

    res.json({
      exams: report.entranceExams,
      degree: user.degree,
      semester: user.semester
    });
  } catch (error) {
    console.error('Exams error:', error);
    res.status(500).json({ message: 'Error fetching exam recommendations', error: error.message });
  }
});

module.exports = router;
