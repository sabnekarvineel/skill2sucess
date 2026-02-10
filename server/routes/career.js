const express = require('express');
const User = require('../models/User');
const CareerProfile = require('../models/CareerProfile');
const Exam = require('../models/Exam');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Calculate suitability score
const calculateSuitability = (userSkills, requiredSkills) => {
  let matchCount = 0;
  let totalRequired = Object.values(requiredSkills).flat().length;
  
  Object.keys(requiredSkills).forEach(category => {
    requiredSkills[category].forEach(skill => {
      if (userSkills[category] && userSkills[category].includes(skill)) {
        matchCount++;
      }
    });
  });
  
  return totalRequired > 0 ? Math.round((matchCount / totalRequired) * 100) : 0;
};

// Get career recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user has skills object with all properties
    if (!user.skills) {
      user.skills = {
        programming: [],
        databases: [],
        frameworks: [],
        tools: [],
        softSkills: [],
        other: []
      };
    }

    const careerProfiles = await CareerProfile.find();
    const exams = await Exam.find();
    
    if (careerProfiles.length === 0) {
      return res.status(400).json({ message: 'No career profiles available' });
    }
    
    const jobRecommendations = careerProfiles.map(profile => {
      const score = calculateSuitability(user.skills, profile.requiredSkills);
      
      const missingSkills = [];
      Object.keys(profile.requiredSkills).forEach(category => {
        if (profile.requiredSkills[category] && Array.isArray(profile.requiredSkills[category])) {
          profile.requiredSkills[category].forEach(skill => {
            if (!user.skills[category] || !user.skills[category].includes(skill)) {
              missingSkills.push(skill);
            }
          });
        }
      });
      
      const matchingSkills = [];
      Object.keys(profile.requiredSkills).forEach(category => {
        if (profile.requiredSkills[category] && Array.isArray(profile.requiredSkills[category])) {
          profile.requiredSkills[category].forEach(skill => {
            if (user.skills[category] && user.skills[category].includes(skill)) {
              matchingSkills.push(skill);
            }
          });
        }
      });

      // Categorize suitability
      const suitabilityCategory = 
        score >= 80 ? 'Highly Suitable' :
        score >= 60 ? 'Moderately Suitable' :
        score >= 40 ? 'Developing' : 'Needs Focus';

      // Generate dynamic recommendations
      const recommendations = [];
      if (score >= 80) {
        recommendations.push('You are well-suited for this role!');
        recommendations.push('Consider building a portfolio to showcase your skills');
        recommendations.push('Stay updated with the latest industry trends');
      } else if (score >= 60) {
        recommendations.push(`Build strength in ${missingSkills[0] || 'core skills'}`);
        recommendations.push('Take online courses to bridge skill gaps');
        recommendations.push('Work on real-world projects in this domain');
      } else if (score >= 40) {
        recommendations.push('Focus on fundamentals of this field');
        recommendations.push(`Start with learning ${missingSkills.slice(0, 2).join(' and ')}`);
        recommendations.push('Build foundational projects');
      } else {
        recommendations.push('Consider starting with basics of programming and web development');
        recommendations.push('Take beginner-friendly courses first');
        recommendations.push('Build simple projects to gain experience');
      }
      
      return {
        role: profile.jobRole,
        suitabilityScore: score,
        suitabilityCategory,
        description: profile.description,
        matchingSkills,
        missingSkills: missingSkills.slice(0, 5), // Top 5 missing skills
        avgSalary: profile.avgSalary,
        jobMarketDemand: profile.jobMarketDemand,
        learningPath: profile.learningPath || [],
        companies: profile.companies || [],
        recommendations
      };
    }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    
    const higherStudies = [
      { name: 'MCA (Master of Computer Applications)', duration: '2 years', description: 'Advanced degree in Computer Applications' },
      { name: 'M.Tech CSE/IT', duration: '2 years', description: 'Master of Technology in Computer Science' },
      { name: 'M.Sc Data Science', duration: '2 years', description: 'Specialized degree in Data Science' },
      { name: 'MBA (Information Technology)', duration: '2 years', description: 'Management degree with IT focus' },
      { name: 'M.Tech Specializations (AI/ML, Cloud, Cybersecurity)', duration: '2 years', description: 'Specialized advanced degree' }
    ];
    
    const relevantExams = exams.filter(exam => {
      if (exam.examType === 'Entrance') return true;
      if (exam.examType === 'Certification') return true;
      return false;
    }).map(e => ({ 
      name: e.examName, 
      date: e.examDate,
      type: e.examType,
      difficulty: e.difficulty
    }));
    
    // Collect all unique skill gaps
    const allSkillGaps = new Set();
    jobRecommendations.forEach(job => {
      job.missingSkills.forEach(skill => allSkillGaps.add(skill));
    });
    
    const responseData = {
      jobRoles: jobRecommendations,
      higherStudies,
      entranceExams: relevantExams,
      skillGaps: Array.from(allSkillGaps).slice(0, 10),
      summary: {
        totalRolesAnalyzed: jobRecommendations.length,
        topRecommendedRole: jobRecommendations[0],
        averageSuitabilityScore: Math.round(jobRecommendations.reduce((a, b) => a + b.suitabilityScore, 0) / jobRecommendations.length),
        highlySelected: jobRecommendations.filter(r => r.suitabilityScore >= 80),
        moderatelySelected: jobRecommendations.filter(r => r.suitabilityScore >= 60 && r.suitabilityScore < 80)
      }
    };
    
    // Update user recommendations (only store the schema-compatible data)
    await User.findByIdAndUpdate(req.userId, {
      careerRecommendations: {
        jobRoles: jobRecommendations.map(role => ({
          role: role.role,
          suitabilityScore: role.suitabilityScore,
          matchingSkills: role.matchingSkills,
          missingSkills: role.missingSkills,
          recommendations: role.recommendations
        })),
        higherStudies: higherStudies.map(h => h.name),
        entranceExams: relevantExams.map(e => e.name),
        skillGaps: Array.from(allSkillGaps).slice(0, 10)
      },
      updatedAt: Date.now()
    });
    
    res.json(responseData);
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all career profiles
router.get('/profiles', async (req, res) => {
  try {
    const profiles = await CareerProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all exams
router.get('/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
