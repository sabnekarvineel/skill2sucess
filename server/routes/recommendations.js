const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Skill gap analysis and resource recommendation engine
const SKILL_RESOURCES = {
  'Web Development': [
    {
      title: 'The Complete Web Development Bootcamp',
      category: 'Web Development',
      level: 'Beginner',
      description: 'Learn HTML, CSS, JavaScript, Node.js, and more',
      link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/'
    },
    {
      title: 'MDN Web Docs',
      category: 'Web Development',
      level: 'All Levels',
      description: 'Comprehensive documentation for web technologies',
      link: 'https://developer.mozilla.org/'
    }
  ],
  'Mobile Development': [
    {
      title: 'React Native Official Documentation',
      category: 'Mobile Development',
      level: 'Intermediate',
      description: 'Build native mobile apps with React',
      link: 'https://reactnative.dev/'
    },
    {
      title: 'Flutter Documentation',
      category: 'Mobile Development',
      level: 'Intermediate',
      description: 'Build beautiful native apps with Flutter',
      link: 'https://flutter.dev/'
    }
  ],
  'Data Science': [
    {
      title: 'Andrew Ng\'s Machine Learning Course',
      category: 'Data Science',
      level: 'Beginner',
      description: 'Foundational machine learning concepts',
      link: 'https://www.coursera.org/learn/machine-learning'
    },
    {
      title: 'Fast.ai - Practical Deep Learning',
      category: 'Data Science',
      level: 'Intermediate',
      description: 'Top-down approach to deep learning',
      link: 'https://www.fast.ai/'
    }
  ],
  'DevOps': [
    {
      title: 'Docker Official Documentation',
      category: 'DevOps',
      level: 'Intermediate',
      description: 'Container orchestration and deployment',
      link: 'https://docs.docker.com/'
    },
    {
      title: 'Kubernetes Official Tutorial',
      category: 'DevOps',
      level: 'Intermediate',
      description: 'Orchestrate containerized applications',
      link: 'https://kubernetes.io/docs/tutorials/'
    }
  ],
  'Cloud Computing': [
    {
      title: 'AWS Certified Solutions Architect',
      category: 'Cloud Computing',
      level: 'Intermediate',
      description: 'AWS cloud platform and services',
      link: 'https://aws.amazon.com/training/'
    },
    {
      title: 'Google Cloud Platform Documentation',
      category: 'Cloud Computing',
      level: 'Beginner',
      description: 'GCP services and best practices',
      link: 'https://cloud.google.com/docs'
    }
  ],
  'Database Design': [
    {
      title: 'SQL Tutorial - W3Schools',
      category: 'Database Design',
      level: 'Beginner',
      description: 'Master SQL fundamentals',
      link: 'https://www.w3schools.com/sql/'
    },
    {
      title: 'MongoDB University',
      category: 'Database Design',
      level: 'Beginner',
      description: 'NoSQL database design and implementation',
      link: 'https://university.mongodb.com/'
    }
  ],
  'Cybersecurity': [
    {
      title: 'OWASP Top 10',
      category: 'Cybersecurity',
      level: 'Intermediate',
      description: 'Web application security',
      link: 'https://owasp.org/www-project-top-ten/'
    },
    {
      title: 'Cybrary - Free Security Training',
      category: 'Cybersecurity',
      level: 'Beginner',
      description: 'Comprehensive cybersecurity courses',
      link: 'https://www.cybrary.it/'
    }
  ]
};

// Career path recommendations database
const CAREER_PATHS = {
  'Full Stack Developer': {
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs'],
    suggestedCourses: ['Web Development', 'Database Design'],
    avgSalary: '₹6-15 LPA',
    growth: 'High',
    description: 'Build complete web applications from frontend to backend'
  },
  'Frontend Developer': {
    requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML', 'UI/UX'],
    suggestedCourses: ['Web Development'],
    avgSalary: '₹5-12 LPA',
    growth: 'High',
    description: 'Create engaging user interfaces and web experiences'
  },
  'Backend Developer': {
    requiredSkills: ['Node.js', 'Python', 'SQL', 'Database Design', 'APIs'],
    suggestedCourses: ['Database Design', 'Cloud Computing'],
    avgSalary: '₹6-14 LPA',
    growth: 'High',
    description: 'Build scalable server-side applications'
  },
  'Data Scientist': {
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Analysis'],
    suggestedCourses: ['Data Science'],
    avgSalary: '₹8-18 LPA',
    growth: 'Very High',
    description: 'Extract insights from data using statistical and ML techniques'
  },
  'DevOps Engineer': {
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Computing'],
    suggestedCourses: ['DevOps', 'Cloud Computing'],
    avgSalary: '₹7-16 LPA',
    growth: 'High',
    description: 'Manage infrastructure and deployment pipelines'
  },
  'Mobile Developer': {
    requiredSkills: ['React Native', 'JavaScript', 'Mobile UI', 'APIs', 'Firebase'],
    suggestedCourses: ['Mobile Development'],
    avgSalary: '₹6-13 LPA',
    growth: 'High',
    description: 'Build native and cross-platform mobile applications'
  },
  'Cloud Architect': {
    requiredSkills: ['AWS', 'Azure', 'Cloud Design', 'Security', 'Networking'],
    suggestedCourses: ['Cloud Computing', 'Cybersecurity'],
    avgSalary: '₹12-25 LPA',
    growth: 'Very High',
    description: 'Design and manage cloud infrastructure solutions'
  },
  'Software Architect': {
    requiredSkills: ['System Design', 'Multiple Languages', 'Database Design', 'Leadership'],
    suggestedCourses: ['All'],
    avgSalary: '₹15-30 LPA',
    growth: 'High',
    description: 'Design large-scale software systems'
  }
};

// Calculate skill match percentage
const calculateSkillMatch = (userSkills, requiredSkills) => {
  const allSkills = [
    ...userSkills.programming,
    ...userSkills.databases,
    ...userSkills.frameworks,
    ...userSkills.tools,
    ...(userSkills.softSkills || []),
    ...(userSkills.other || [])
  ];

  const matchedSkills = requiredSkills.filter(skill =>
    allSkills.some(userSkill =>
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );

  return {
    percentage: requiredSkills.length > 0
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0,
    matched: matchedSkills,
    missing: requiredSkills.filter(s => !matchedSkills.includes(s))
  };
};

// Get comprehensive recommendations analysis
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure skills object exists with all required properties
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

    // Analyze all career paths
    const careerAnalysis = Object.entries(CAREER_PATHS).map(([role, path]) => {
      const match = calculateSkillMatch(user.skills, path.requiredSkills);
      return {
        role,
        suitabilityScore: match.percentage,
        description: path.description,
        avgSalary: path.avgSalary,
        growthPotential: path.growth,
        matchingSkills: match.matched,
        missingSkills: match.missing,
        suggestedCourses: path.suggestedCourses,
        recommendations: generateRecommendations(match.percentage, match.missing)
      };
    }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    // Identify skill gaps
    const allMissingSkills = new Set();
    careerAnalysis.forEach(career => {
      career.missingSkills.forEach(skill => allMissingSkills.add(skill));
    });

    const skillGaps = Array.from(allMissingSkills)
      .slice(0, 5)
      .map(gap => `Learn ${gap}`);

    // Generate relevant resources
    const resources = generateResources(careerAnalysis, allMissingSkills);

    // Higher education suggestions
    const higherStudies = [
      'M.Tech Computer Science',
      'M.Tech Specialization (AI/ML, Cloud Computing, Cybersecurity)',
      'MCA (Master of Computer Applications)',
      'M.Sc Data Science',
      'MBA (Information Technology)',
      'Specialized Bootcamps and Certifications'
    ];

    const analysis = {
      jobRoles: careerAnalysis.slice(0, 8),
      skillGaps,
      resources,
      higherStudies,
      recommendedPath: careerAnalysis[0],
      overallSkillLevel: calculateOverallLevel(user.skills),
      studySuggestions: generateStudySuggestions(user.skills)
    };

    // Update user in database - only store serializable data
    await User.findByIdAndUpdate(
      req.userId,
      {
        careerRecommendations: {
          jobRoles: analysis.jobRoles.map(role => ({
            role: role.role,
            suitabilityScore: role.suitabilityScore,
            matchingSkills: role.matchingSkills,
            missingSkills: role.missingSkills,
            recommendations: role.recommendations
          })),
          higherStudies: analysis.higherStudies,
          entranceExams: [],  // Will be populated by report endpoint
          skillGaps: analysis.skillGaps
        }
      },
      { new: true }
    );

    res.json(analysis);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating recommendations', error: error.message });
  }
});

// Helper function to generate recommendations
function generateRecommendations(score, missingSkills) {
  const recommendations = [];

  if (score >= 80) {
    recommendations.push('You are well-suited for this role!');
    recommendations.push('Focus on staying updated with latest technologies');
    recommendations.push('Build a portfolio with real-world projects');
  } else if (score >= 60) {
    recommendations.push(`Learn ${missingSkills[0]} to improve fit`);
    recommendations.push('Take targeted courses in your skill gaps');
    recommendations.push('Build projects to apply newly learned skills');
  } else if (score >= 40) {
    recommendations.push('This role requires significant skill development');
    recommendations.push(`Start with fundamentals: ${missingSkills.slice(0, 2).join(', ')}`);
    recommendations.push('Follow a structured learning path');
  } else {
    recommendations.push('Consider starting with foundational concepts');
    recommendations.push('Take beginner-friendly courses in core areas');
    recommendations.push('Build basic projects to practice');
  }

  return recommendations;
}

// Helper function to generate study suggestions
function generateStudySuggestions(skills) {
  const suggestions = [];

  if (skills.programming.length === 0) {
    suggestions.push('Start learning a programming language (Python or JavaScript recommended)');
  }

  if (skills.frameworks.length === 0) {
    suggestions.push('Learn a web or mobile framework relevant to your interests');
  }

  if (skills.databases.length === 0) {
    suggestions.push('Master SQL and at least one NoSQL database');
  }

  if (skills.tools.length < 3) {
    suggestions.push('Explore developer tools: Git, Docker, VS Code, etc.');
  }

  if (skills.softSkills.length === 0) {
    suggestions.push('Develop soft skills: Communication, Problem-solving, Leadership');
  }

  return suggestions.slice(0, 5);
}

// Helper function to generate resources
function generateResources(careerAnalysis, skillGaps) {
  const resources = [];
  const usedCourses = new Set();

  // Add resources for top career paths
  careerAnalysis.slice(0, 3).forEach(career => {
    career.suggestedCourses.forEach(course => {
      if (course !== 'All' && !usedCourses.has(course) && SKILL_RESOURCES[course]) {
        usedCourses.add(course);
        resources.push(...SKILL_RESOURCES[course].slice(0, 2));
      }
    });
  });

  // Add general resources for skill gaps
  for (const [key, items] of Object.entries(SKILL_RESOURCES)) {
    if (resources.length < 12 && !usedCourses.has(key)) {
      resources.push(items[0]);
    }
  }

  return resources.slice(0, 12);
}

// Helper function to calculate overall skill level
function calculateOverallLevel(skills) {
  const totalSkills =
    (skills.programming?.length || 0) +
    (skills.frameworks?.length || 0) +
    (skills.databases?.length || 0) +
    (skills.tools?.length || 0) +
    (skills.softSkills?.length || 0);

  if (totalSkills < 5) return { level: 'Beginner', percentage: 20 };
  if (totalSkills < 10) return { level: 'Intermediate', percentage: 50 };
  if (totalSkills < 15) return { level: 'Advanced', percentage: 75 };
  return { level: 'Expert', percentage: 90 };
}

module.exports = router;
