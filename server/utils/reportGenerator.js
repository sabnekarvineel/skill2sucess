/**
 * Report Generator - Creates comprehensive career suitability reports
 * Includes: Career role suitability, skill gaps, learning importance, higher studies options, entrance exams
 */

const calculateSuitabilityScore = (userSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  
  const matchingSkills = userSkills.filter(skill => 
    requiredSkills.includes(skill)
  );
  
  return Math.round((matchingSkills.length / requiredSkills.length) * 100);
};

const getSkillCategories = (user) => {
  return {
    programming: user.skills?.programming || [],
    databases: user.skills?.databases || [],
    frameworks: user.skills?.frameworks || [],
    tools: user.skills?.tools || [],
    softSkills: user.skills?.softSkills || [],
    other: user.skills?.other || []
  };
};

const getAllUserSkills = (skillCategories) => {
  return [
    ...skillCategories.programming,
    ...skillCategories.databases,
    ...skillCategories.frameworks,
    ...skillCategories.tools,
    ...skillCategories.softSkills,
    ...skillCategories.other
  ];
};

const analyzeSkillGaps = (jobRole, userSkills) => {
  const requiredSkillsFlat = [
    ...jobRole.requiredSkills.programming,
    ...jobRole.requiredSkills.databases,
    ...jobRole.requiredSkills.frameworks,
    ...jobRole.requiredSkills.tools,
    ...jobRole.softSkills
  ];

  const missingSkills = requiredSkillsFlat.filter(
    skill => !userSkills.includes(skill)
  );

  return {
    totalRequired: requiredSkillsFlat.length,
    totalMissing: missingSkills.length,
    completionPercentage: Math.round(
      ((requiredSkillsFlat.length - missingSkills.length) / requiredSkillsFlat.length) * 100
    ),
    missingSkills,
    skillGapRatio: `${requiredSkillsFlat.length - missingSkills.length}/${requiredSkillsFlat.length}`
  };
};

const calculateLearningImportance = (suitabilityScore, skillGap, jobMarketDemand) => {
  // Learning importance is based on:
  // 1. How much the user lacks in required skills (inverse of suitability)
  // 2. Market demand for the role
  // 3. Number of missing skills
  
  let importance = 0;
  
  // Skill gap factor (40% weight)
  importance += (100 - suitabilityScore) * 0.4;
  
  // Market demand factor (40% weight)
  const demandScores = { 'High': 40, 'Medium': 30, 'Low': 20 };
  importance += demandScores[jobMarketDemand] || 30;
  
  // Missing skills count factor (20% weight)
  importance += Math.min(skillGap.totalMissing * 2, 20);
  
  return Math.round(importance);
};

const generateCareerReport = (user, careerProfiles) => {
  const userSkillCategories = getSkillCategories(user);
  const allUserSkills = getAllUserSkills(userSkillCategories);
  
  const jobRoleAnalysis = careerProfiles.map(role => {
    const suitabilityScore = calculateSuitabilityScore(allUserSkills, [
      ...role.requiredSkills.programming,
      ...role.requiredSkills.databases,
      ...role.requiredSkills.frameworks,
      ...role.requiredSkills.tools
    ]);

    const skillGap = analyzeSkillGaps(role, allUserSkills);
    const learningImportance = calculateLearningImportance(
      suitabilityScore,
      skillGap,
      role.jobMarketDemand
    );

    return {
      jobRole: role.jobRole,
      description: role.description,
      suitabilityScore,
      category: suitabilityScore >= 80 ? 'Highly Suitable' : 
               suitabilityScore >= 60 ? 'Moderately Suitable' :
               suitabilityScore >= 40 ? 'Developing' : 'Needs Focus',
      skillGap,
      learningImportance,
      marketDemand: role.jobMarketDemand,
      avgSalary: role.avgSalary,
      learningPath: role.learningPath,
      companies: role.companies
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  return jobRoleAnalysis;
};

const generateHigherStudiesRecommendations = (user, suitabilityScores) => {
  // Recommend higher studies based on performance and interests
  const avgScore = Math.round(
    suitabilityScores.reduce((a, b) => a + b, 0) / suitabilityScores.length
  );

  const recommendations = [];

  // MCA Recommendation
  const mcaEligible = user.degree.includes('BCA') || 
                     user.degree.includes('B.Tech') ||
                     user.degree.includes('B.Sc');
  if (mcaEligible) {
    recommendations.push({
      program: 'MCA (Master of Computer Applications)',
      eligibility: user.degree,
      suitability: avgScore >= 65 ? 'Highly Recommended' : 'Recommended',
      expectedPercentile: Math.round(avgScore * 1.2),
      duration: '2 Years',
      topColleges: ['IIT Delhi', 'IIT Bombay', 'BITS Pilani', 'IIIT Hyderabad'],
      careerOutcome: 'Software Development, Data Science, Cloud Architecture'
    });
  }

  // M.Tech Recommendation
  if (user.degree.includes('B.Tech')) {
    recommendations.push({
      program: 'M.Tech (Computer Science)',
      eligibility: 'B.Tech in CS/IT',
      suitability: avgScore >= 70 ? 'Highly Recommended' : 'Recommended',
      expectedPercentile: Math.round(avgScore * 1.15),
      duration: '2 Years',
      topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Kanpur', 'NIT Trichy'],
      careerOutcome: 'Research, Teaching, Technical Leadership'
    });
  }

  // M.Sc Recommendation
  recommendations.push({
    program: 'M.Sc (Computer Science)',
    eligibility: user.degree,
    suitability: avgScore >= 60 ? 'Recommended' : 'Consider',
    expectedPercentile: Math.round(avgScore * 1.1),
    duration: '2 Years',
    topColleges: ['Delhi University', 'Mumbai University', 'Pune University'],
    careerOutcome: 'Software Development, Teaching, Quality Assurance'
  });

  // MBA Tech Recommendation
  if (user.semester >= 6) {
    recommendations.push({
      program: 'MBA (Technology)',
      eligibility: 'Any stream with work experience',
      suitability: avgScore >= 50 ? 'Consider' : 'Future Option',
      expectedPercentile: 50,
      duration: '2 Years',
      topColleges: ['IIM A/B/C', 'XLRI', 'ISB', 'FMS Delhi'],
      careerOutcome: 'Technical Management, Product Management, Consulting'
    });
  }

  return recommendations;
};

const generateEntranceExamRecommendations = (user, jobRoles) => {
  const exams = [];

  // For MCA aspirants
  if (user.degree.includes('BCA') || user.degree.includes('B.Tech')) {
    exams.push({
      examName: 'NIMCET (National Institute of Technology)',
      examType: 'Entrance',
      targetProgram: 'MCA',
      difficulty: 'Hard',
      difficulty_percentage: 65,
      preparations_months: '6-8',
      expectedPercentile: Math.round(80 + Math.random() * 20),
      syllabus: ['Data Structures', 'Algorithms', 'Discrete Mathematics', 'Digital Logic', 'C Programming'],
      resources: [
        'GeeksforGeeks',
        'PrepBytes',
        'Coding Ninjas',
        'Official NIMCET Website'
      ]
    });
  }

  // For M.Tech aspirants
  if (user.degree.includes('B.Tech')) {
    exams.push({
      examName: 'GATE (Graduate Aptitude Test in Engineering)',
      examType: 'Entrance',
      targetProgram: 'M.Tech / PhD',
      difficulty: 'Hard',
      difficulty_percentage: 70,
      preparations_months: '6-8',
      expectedPercentile: Math.round(75 + Math.random() * 25),
      syllabus: ['Data Structures', 'Algorithms', 'Digital Logic', 'DBMS', 'Networks', 'OS'],
      resources: [
        'Made Easy',
        'Ace Academy',
        'NPTEL',
        'GFG GATE Prep',
        'Gate Smashers'
      ]
    });
  }

  // Competitive Certifications
  exams.push({
    examName: 'Oracle Certified Associate Java Programmer',
    examType: 'Certification',
    targetProgram: 'Java Development',
    difficulty: 'Medium',
    difficulty_percentage: 45,
    preparations_months: '2-3',
    expectedPercentile: Math.round(70 + Math.random() * 30),
    syllabus: ['Java Basics', 'OOP', 'Collections', 'Exception Handling'],
    resources: ['Oracle Docs', 'Udemy', 'Whizlabs', 'Practice Tests']
  });

  exams.push({
    examName: 'AWS Certified Solutions Architect',
    examType: 'Certification',
    targetProgram: 'Cloud Computing',
    difficulty: 'Hard',
    difficulty_percentage: 60,
    preparations_months: '3-4',
    expectedPercentile: Math.round(65 + Math.random() * 35),
    syllabus: ['EC2', 'S3', 'RDS', 'CloudFront', 'IAM', 'VPC'],
    resources: ['A Cloud Guru', 'Linux Academy', 'Udemy', 'Official AWS']
  });

  return exams;
};

const generateComprehensiveReport = (user, careerProfiles, exams) => {
  // Generate career analysis
  const careerAnalysis = generateCareerReport(user, careerProfiles);
  
  // Get suitability scores
  const suitabilityScores = careerAnalysis.map(role => role.suitabilityScore);
  const avgSuitabilityScore = Math.round(
    suitabilityScores.reduce((a, b) => a + b, 0) / suitabilityScores.length
  );

  // Generate higher studies recommendations
  const higherStudies = generateHigherStudiesRecommendations(user, suitabilityScores);

  // Generate exam recommendations
  const examRecommendations = generateEntranceExamRecommendations(user, careerAnalysis);

  // Overall skill assessment
  const userSkillCategories = getSkillCategories(user);
  const totalSkillsCount = Object.values(userSkillCategories)
    .reduce((sum, cat) => sum + cat.length, 0);

  const overallSkillAnalysis = {
    totalSkillsAcquired: totalSkillsCount,
    skillBreakdown: {
      programming: userSkillCategories.programming.length,
      databases: userSkillCategories.databases.length,
      frameworks: userSkillCategories.frameworks.length,
      tools: userSkillCategories.tools.length,
      softSkills: userSkillCategories.softSkills.length,
      other: userSkillCategories.other.length
    },
    averageSuitabilityScore: avgSuitabilityScore,
    topRoles: careerAnalysis.slice(0, 3),
    developingRoles: careerAnalysis.filter(r => r.suitabilityScore < 60).slice(0, 3)
  };

  // Generate learning roadmap
  const learningRoadmap = careerAnalysis
    .filter(role => role.suitabilityScore < 80)
    .slice(0, 5)
    .map(role => ({
      targetRole: role.jobRole,
      priority: role.learningImportance,
      estimatedTimeMonths: Math.ceil(role.skillGap.totalMissing / 2),
      topMissingSkills: role.skillGap.missingSkills.slice(0, 5),
      learningPath: role.learningPath
    }));

  return {
    studentProfile: {
      name: user.fullName,
      degree: user.degree,
      semester: user.semester,
      cgpa: user.cgpa,
      interests: user.interests,
      registeredDate: user.registeredAt
    },
    overallSkillAnalysis,
    careerRolesSuitability: careerAnalysis,
    skillGapAnalysis: {
      averageGapPercentage: Math.round(
        careerAnalysis.reduce((sum, role) => sum + (100 - role.suitabilityScore), 0) / careerAnalysis.length
      ),
      focusAreas: careerAnalysis
        .filter(r => r.suitabilityScore < 60)
        .map(r => r.jobRole)
    },
    learningRoadmap,
    higherStudiesOptions: higherStudies,
    entranceExams: examRecommendations,
    reportMetadata: {
      generatedDate: new Date(),
      reportVersion: '1.0',
      totalCareersAnalyzed: careerAnalysis.length,
      recommendedPrograms: higherStudies.length,
      relevantExams: examRecommendations.length
    }
  };
};

module.exports = {
  generateComprehensiveReport,
  generateCareerReport,
  generateHigherStudiesRecommendations,
  generateEntranceExamRecommendations,
  calculateSuitabilityScore,
  analyzeSkillGaps,
  calculateLearningImportance
};
