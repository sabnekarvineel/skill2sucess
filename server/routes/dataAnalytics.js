const express = require('express');
const User = require('../models/User');
const CareerProfile = require('../models/CareerProfile');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Data Analytics specific learning roadmap data
const DATA_ANALYTICS_ROADMAP = {
  overview: {
    field: 'Data Analytics',
    description: 'Transform raw data into actionable business insights using analytical tools, programming, and visualization.',
    estimatedTimeline: '6-12 months',
    jobMarketDemand: 'Very High',
    avgSalary: '₹4-12 LPA for entry level, ₹12-25+ for experienced',
    growthRate: '25% annually'
  },

  skillLevels: {
    beginner: {
      duration: '2-3 months',
      skills: {
        programming: ['Python basics', 'SQL basics'],
        tools: ['Excel Advanced', 'Google Sheets'],
        soft: ['Data thinking', 'Problem analysis']
      },
      resources: [
        {
          name: 'Excel Mastery Course',
          platform: 'Udemy',
          duration: '15 hours',
          cost: '₹499',
          link: 'https://udemy.com'
        },
        {
          name: 'Python for Data Analysis',
          platform: 'Coursera',
          duration: '40 hours',
          cost: 'Free/₹6000 (Certificate)',
          link: 'https://coursera.org'
        },
        {
          name: 'SQL for Beginners',
          platform: 'W3Schools/YouTube',
          duration: '20 hours',
          cost: 'Free',
          link: 'https://w3schools.com/sql'
        }
      ],
      projects: [
        'Analyze a Kaggle dataset using Excel',
        'Write SQL queries for a sample database',
        'Create a simple data report using Google Sheets'
      ]
    },

    intermediate: {
      duration: '3-4 months',
      skills: {
        programming: ['Python (Pandas, NumPy)', 'SQL Advanced'],
        databases: ['MySQL', 'PostgreSQL'],
        visualization: ['Tableau basics', 'Power BI basics'],
        statistics: ['Descriptive statistics', 'Probability']
      },
      resources: [
        {
          name: 'Data Analysis with Pandas',
          platform: 'DataCamp',
          duration: '25 hours',
          cost: '₹8000/month',
          link: 'https://datacamp.com'
        },
        {
          name: 'Advanced SQL',
          platform: 'LeetCode/HackerRank',
          duration: '30 hours',
          cost: 'Free/Premium',
          link: 'https://leetcode.com'
        },
        {
          name: 'Tableau Public Training',
          platform: 'Tableau Public',
          duration: '20 hours',
          cost: 'Free',
          link: 'https://public.tableau.com'
        },
        {
          name: 'Statistics Fundamentals',
          platform: 'Khan Academy',
          duration: '40 hours',
          cost: 'Free',
          link: 'https://khanacademy.org'
        }
      ],
      projects: [
        'Perform exploratory data analysis on real dataset',
        'Build SQL queries for business problems',
        'Create interactive dashboards using Tableau',
        'Analyze A/B testing scenarios'
      ]
    },

    advanced: {
      duration: '2-3 months',
      skills: {
        programming: ['Python Advanced', 'R', 'Python ML basics'],
        databases: ['Data Warehousing', 'MongoDB'],
        visualization: ['Tableau Advanced', 'Power BI Advanced'],
        analytics: ['Predictive analytics', 'Statistical modeling']
      },
      resources: [
        {
          name: 'Machine Learning with Python',
          platform: 'Coursera/Udemy',
          duration: '40 hours',
          cost: '₹499-6000',
          link: 'https://udemy.com'
        },
        {
          name: 'Advanced Tableau',
          platform: 'Tableau Desktop Specialist',
          duration: '25 hours',
          cost: '₹2000-3000',
          link: 'https://tableau.com/certification'
        },
        {
          name: 'Google Analytics Certification',
          platform: 'Google Analytics Academy',
          duration: '20 hours',
          cost: 'Free',
          link: 'https://analytics.google.com/academy'
        },
        {
          name: 'Big Data with Hadoop/Spark',
          platform: 'Udacity',
          duration: '30 hours',
          cost: '₹5000-8000',
          link: 'https://udacity.com'
        }
      ],
      projects: [
        'Build ML model for predictive analytics',
        'Create data pipeline and ETL process',
        'Design data warehouse schema',
        'Develop end-to-end analytics solution'
      ]
    }
  },

  careerPaths: [
    {
      role: 'Junior Data Analyst',
      experience: '0-2 years',
      salary: '₹4-7 LPA',
      responsibilities: ['Data cleaning', 'Creating reports', 'Ad-hoc analysis', 'Dashboard maintenance'],
      requiredSkills: ['Excel', 'SQL', 'Basic Python', 'Tableau/PowerBI']
    },
    {
      role: 'Senior Data Analyst',
      experience: '2-4 years',
      salary: '₹8-12 LPA',
      responsibilities: ['Advanced analytics', 'Strategy development', 'Team mentoring', 'Process optimization'],
      requiredSkills: ['Advanced SQL', 'Python', 'Statistics', 'Tableau Advanced', 'Domain expertise']
    },
    {
      role: 'Data Engineer',
      experience: '3-5 years (from analyst role)',
      salary: '₹12-18 LPA',
      responsibilities: ['Data pipeline design', 'ETL development', 'Database optimization', 'Infrastructure'],
      requiredSkills: ['SQL', 'Python/Scala', 'Hadoop/Spark', 'Cloud platforms']
    },
    {
      role: 'Analytics Manager',
      experience: '4+ years',
      salary: '₹15-25 LPA',
      responsibilities: ['Team leadership', 'Strategy', 'Stakeholder management', 'Project oversight'],
      requiredSkills: ['All analyst skills + Leadership', 'Communication', 'Business acumen']
    },
    {
      role: 'Data Science Transition',
      experience: '3-5 years (from analyst role)',
      salary: '₹12-20 LPA',
      responsibilities: ['ML model development', 'Advanced predictive analytics', 'Research', 'Innovation'],
      requiredSkills: ['Python Advanced', 'Statistics', 'ML', 'Domain expertise']
    }
  ],

  tools: [
    {
      category: 'Programming',
      tools: [
        { name: 'Python', importance: 'Critical', reason: 'Data manipulation, automation' },
        { name: 'R', importance: 'High', reason: 'Statistical analysis, visualization' },
        { name: 'SQL', importance: 'Critical', reason: 'Database querying' }
      ]
    },
    {
      category: 'Visualization',
      tools: [
        { name: 'Tableau', importance: 'Critical', reason: 'Interactive dashboards' },
        { name: 'Power BI', importance: 'High', reason: 'Microsoft ecosystem integration' },
        { name: 'Looker', importance: 'Medium', reason: 'Data exploration' },
        { name: 'Matplotlib/Seaborn', importance: 'High', reason: 'Python visualization' }
      ]
    },
    {
      category: 'Databases',
      tools: [
        { name: 'MySQL', importance: 'High', reason: 'Relational data' },
        { name: 'PostgreSQL', importance: 'High', reason: 'Advanced features' },
        { name: 'MongoDB', importance: 'Medium', reason: 'NoSQL handling' },
        { name: 'BigQuery', importance: 'Medium', reason: 'Cloud analytics' }
      ]
    },
    {
      category: 'Analytics/BI',
      tools: [
        { name: 'Google Analytics', importance: 'High', reason: 'Web analytics' },
        { name: 'Excel', importance: 'Critical', reason: 'Data analysis foundation' },
        { name: 'Mixpanel', importance: 'Medium', reason: 'Product analytics' }
      ]
    }
  ],

  certifications: [
    {
      name: 'Google Data Analytics Professional Certificate',
      provider: 'Coursera',
      duration: '6 months',
      cost: 'Free/₹6000',
      difficulty: 'Beginner-Intermediate',
      skills: ['Excel', 'SQL', 'Tableau', 'Analytics']
    },
    {
      name: 'Tableau Desktop Specialist',
      provider: 'Tableau',
      duration: '1-2 months',
      cost: '₹2000-3000',
      difficulty: 'Intermediate',
      skills: ['Tableau', 'Data visualization']
    },
    {
      name: 'Microsoft Certified: Data Analyst Associate',
      provider: 'Microsoft',
      duration: '2-3 months',
      cost: '₹4000-5000',
      difficulty: 'Intermediate',
      skills: ['Power BI', 'DAX', 'SQL']
    },
    {
      name: 'Google Cloud Associate Data Analyst',
      provider: 'Google Cloud',
      duration: '2-3 months',
      cost: '₹4000-5000',
      difficulty: 'Intermediate-Advanced',
      skills: ['BigQuery', 'Google Analytics', 'Data Studio']
    }
  ]
};

// Get Data Analytics Learning Path
router.get('/learning-path', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's current skills
    const userSkills = user.skills || {
      programming: [],
      databases: [],
      frameworks: [],
      tools: [],
      softSkills: [],
      other: []
    };

    // Calculate current level
    let currentLevel = 'beginner';
    const totalSkills = Object.values(userSkills).flat().length;
    
    if (totalSkills >= 10) currentLevel = 'advanced';
    else if (totalSkills >= 5) currentLevel = 'intermediate';

    // Get Data Analyst job profile
    const dataAnalystRole = await CareerProfile.findOne({ jobRole: 'Data Analyst' });

    // Calculate suitability
    const allUserSkills = Object.values(userSkills).flat();
    const requiredSkillsFlat = dataAnalystRole ? [
      ...dataAnalystRole.requiredSkills.programming,
      ...dataAnalystRole.requiredSkills.databases,
      ...dataAnalystRole.requiredSkills.frameworks,
      ...dataAnalystRole.requiredSkills.tools
    ] : [];

    const matchingSkills = allUserSkills.filter(skill => requiredSkillsFlat.includes(skill));
    const suitabilityScore = requiredSkillsFlat.length > 0 
      ? Math.round((matchingSkills.length / requiredSkillsFlat.length) * 100)
      : 0;

    const missingSkills = requiredSkillsFlat.filter(skill => !allUserSkills.includes(skill));

    // Generate personalized roadmap
    const roadmap = {
      ...DATA_ANALYTICS_ROADMAP,
      personalized: {
        currentLevel,
        suitabilityScore,
        matchingSkills,
        missingSkills,
        nextSteps: generateNextSteps(currentLevel, missingSkills),
        estimatedCompletionTime: estimateCompletionTime(currentLevel, missingSkills.length),
        roadmapPhases: generateRoadmapPhases(currentLevel)
      }
    };

    res.json(roadmap);
  } catch (error) {
    console.error('Data Analytics path error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific career path comparison
router.get('/career-paths', auth, async (req, res) => {
  try {
    const paths = DATA_ANALYTICS_ROADMAP.careerPaths;
    res.json({
      careerPaths: paths,
      totalPathsAvailable: paths.length,
      summary: 'Various career progression paths in Data Analytics field'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get skill assessment
router.post('/skill-assessment', auth, async (req, res) => {
  try {
    const { skillCategory, skillLevel } = req.body;
    const user = await User.findById(req.userId);

    if (!user.skills[skillCategory]) {
      user.skills[skillCategory] = [];
    }

    // Assessment recommendations based on level
    const assessmentFeedback = {
      category: skillCategory,
      currentLevel: skillLevel,
      recommendations: getRecommendations(skillCategory, skillLevel)
    };

    res.json(assessmentFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper functions
function generateNextSteps(currentLevel, missingSkills) {
  const nextSteps = [];
  
  switch (currentLevel) {
    case 'beginner':
      nextSteps.push('Master Excel Advanced functions');
      nextSteps.push('Learn SQL basics');
      nextSteps.push('Start Python fundamentals');
      nextSteps.push('Understand data concepts and terminology');
      break;
    case 'intermediate':
      nextSteps.push('Deep dive into Python (Pandas, NumPy)');
      nextSteps.push('Learn advanced SQL queries');
      nextSteps.push('Start Tableau/Power BI training');
      nextSteps.push('Study statistics and probability');
      break;
    case 'advanced':
      nextSteps.push('Pursue certifications (Tableau, Power BI)');
      nextSteps.push('Learn machine learning fundamentals');
      nextSteps.push('Explore big data tools (Spark, Hadoop)');
      nextSteps.push('Build advanced analytics projects');
      break;
  }

  return nextSteps;
}

function estimateCompletionTime(currentLevel, missingSkillsCount) {
  let baseTime = 0;
  
  switch (currentLevel) {
    case 'beginner':
      baseTime = 6;
      break;
    case 'intermediate':
      baseTime = 4;
      break;
    case 'advanced':
      baseTime = 2;
      break;
  }

  const skillAdjustment = Math.ceil(missingSkillsCount / 2);
  return baseTime + skillAdjustment;
}

function generateRoadmapPhases(currentLevel) {
  const phases = [];
  
  if (currentLevel === 'beginner' || currentLevel === 'intermediate') {
    phases.push({
      phase: 1,
      name: 'Foundation Phase',
      duration: '2-3 months',
      focus: ['Excel', 'SQL', 'Python basics']
    });
    phases.push({
      phase: 2,
      name: 'Core Analytics Phase',
      duration: '2-3 months',
      focus: ['Data analysis', 'Visualization', 'Statistics']
    });
    phases.push({
      phase: 3,
      name: 'Advanced Phase',
      duration: '2-3 months',
      focus: ['Advanced tools', 'ML basics', 'Certifications']
    });
  }

  if (currentLevel === 'advanced') {
    phases.push({
      phase: 1,
      name: 'Specialization Phase',
      duration: '1-2 months',
      focus: ['ML', 'Advanced analytics']
    });
    phases.push({
      phase: 2,
      name: 'Certification Phase',
      duration: '2-3 months',
      focus: ['Industry certifications', 'Projects']
    });
  }

  return phases;
}

function getRecommendations(category, level) {
  const recommendations = {
    programming: {
      beginner: ['Start with Python basics', 'Use codecademy or Python.org tutorials', 'Practice with simple problems'],
      intermediate: ['Learn Pandas and NumPy', 'Build data manipulation projects', 'Master list comprehensions'],
      advanced: ['Learn Python ML libraries', 'Optimize code performance', 'Contribute to open-source']
    },
    databases: {
      beginner: ['Learn SQL SELECT basics', 'Practice with sample databases', 'Understand relational concepts'],
      intermediate: ['Master JOINs and subqueries', 'Learn indexing and optimization', 'Work with real databases'],
      advanced: ['Advanced query optimization', 'Learn database design', 'Master window functions']
    },
    tools: {
      beginner: ['Start with Excel', 'Learn basic Tableau', 'Explore Google Analytics'],
      intermediate: ['Master Tableau features', 'Learn Power BI basics', 'Build dashboards'],
      advanced: ['Advanced Tableau/Power BI', 'Learn Looker', 'Build real-time dashboards']
    }
  };

  return recommendations[category]?.[level] || ['Continue learning and practicing'];
}

module.exports = router;
