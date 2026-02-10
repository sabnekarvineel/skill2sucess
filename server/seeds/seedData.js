const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const CareerProfile = require('../models/CareerProfile');
const Exam = require('../models/Exam');

const careerProfiles = [
  {
    jobRole: 'Full Stack Developer',
    description: 'Build complete web applications from frontend to backend using modern technologies.',
    requiredSkills: {
      programming: ['JavaScript', 'Python', 'Java'],
      databases: ['MongoDB', 'PostgreSQL'],
      frameworks: ['React', 'Node.js', 'Express', 'Django'],
      tools: ['Git', 'Docker']
    },
    softSkills: ['Problem Solving', 'Team Work', 'Communication'],
    avgSalary: '₹5-15 LPA',
    jobMarketDemand: 'High',
    learningPath: ['JavaScript Fundamentals', 'React.js', 'Backend Framework', 'Database Design', 'Deployment'],
    companies: ['Google', 'Amazon', 'Microsoft', 'StartupXYZ']
  },
  {
    jobRole: 'Data Scientist',
    description: 'Analyze data and build machine learning models to solve business problems.',
    requiredSkills: {
      programming: ['Python', 'R'],
      databases: ['MySQL', 'MongoDB'],
      frameworks: ['TensorFlow', 'scikit-learn', 'Pandas'],
      tools: ['Jupyter', 'AWS', 'Git']
    },
    softSkills: ['Problem Solving', 'Critical Thinking', 'Communication'],
    avgSalary: '₹6-18 LPA',
    jobMarketDemand: 'High',
    learningPath: ['Statistics', 'Python', 'Machine Learning', 'Deep Learning', 'Big Data'],
    companies: ['Google', 'Amazon', 'Microsoft', 'IBM']
  },
  {
    jobRole: 'Frontend Developer',
    description: 'Create interactive and responsive user interfaces using modern web technologies.',
    requiredSkills: {
      programming: ['JavaScript', 'TypeScript'],
      databases: [],
      frameworks: ['React', 'Vue.js', 'Angular'],
      tools: ['Git', 'Webpack', 'VS Code']
    },
    softSkills: ['Creativity', 'Attention to Detail', 'Communication'],
    avgSalary: '₹4-12 LPA',
    jobMarketDemand: 'High',
    learningPath: ['HTML/CSS', 'JavaScript', 'React/Vue', 'UI/UX Principles', 'Performance Optimization'],
    companies: ['Google', 'Facebook', 'Netflix', 'StartupXYZ']
  },
  {
    jobRole: 'Backend Developer',
    description: 'Build scalable and secure backend systems and APIs.',
    requiredSkills: {
      programming: ['Java', 'Python', 'C++'],
      databases: ['MySQL', 'MongoDB', 'Redis'],
      frameworks: ['Spring', 'Django', 'Node.js'],
      tools: ['Git', 'Docker', 'Linux']
    },
    softSkills: ['Problem Solving', 'Team Work', 'Leadership'],
    avgSalary: '₹5-14 LPA',
    jobMarketDemand: 'High',
    learningPath: ['Programming Fundamentals', 'Database Design', 'API Development', 'Cloud Platforms', 'Microservices'],
    companies: ['Google', 'Amazon', 'Microsoft', 'Uber']
  },
  {
    jobRole: 'DevOps Engineer',
    description: 'Manage infrastructure, deployment pipelines, and system reliability.',
    requiredSkills: {
      programming: ['Python', 'Bash', 'Go'],
      databases: ['PostgreSQL', 'Redis'],
      frameworks: ['Jenkins', 'Kubernetes'],
      tools: ['Docker', 'AWS', 'Linux', 'Git']
    },
    softSkills: ['Problem Solving', 'Team Work', 'Leadership'],
    avgSalary: '₹6-16 LPA',
    jobMarketDemand: 'High',
    learningPath: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
    companies: ['Google', 'Amazon', 'Netflix', 'Uber']
  },
  {
    jobRole: 'Mobile App Developer',
    description: 'Develop native or cross-platform mobile applications.',
    requiredSkills: {
      programming: ['Java', 'Swift', 'Kotlin', 'JavaScript'],
      databases: ['Firebase', 'Realm'],
      frameworks: ['React Native', 'Flutter', 'Android SDK'],
      tools: ['Git', 'Android Studio', 'Xcode']
    },
    softSkills: ['Creativity', 'Problem Solving', 'Communication'],
    avgSalary: '₹4-12 LPA',
    jobMarketDemand: 'Medium',
    learningPath: ['Programming Fundamentals', 'Mobile SDK', 'UI Design', 'API Integration', 'Publishing'],
    companies: ['Google', 'Apple', 'Uber', 'Airbnb']
  },
  {
    jobRole: 'AI/ML Engineer',
    description: 'Develop intelligent systems and machine learning solutions.',
    requiredSkills: {
      programming: ['Python', 'C++'],
      databases: ['MongoDB', 'PostgreSQL'],
      frameworks: ['TensorFlow', 'PyTorch', 'scikit-learn'],
      tools: ['Jupyter', 'Git', 'GCP', 'AWS']
    },
    softSkills: ['Problem Solving', 'Critical Thinking', 'Leadership'],
    avgSalary: '₹8-20 LPA',
    jobMarketDemand: 'High',
    learningPath: ['Advanced Math', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
    companies: ['Google', 'Tesla', 'OpenAI', 'DeepMind']
  },
  {
    jobRole: 'Cloud Solutions Architect',
    description: 'Design and implement cloud infrastructure solutions for enterprises.',
    requiredSkills: {
      programming: ['Python', 'Java'],
      databases: ['PostgreSQL', 'MongoDB', 'DynamoDB'],
      frameworks: ['Spring', 'Django'],
      tools: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes']
    },
    softSkills: ['Leadership', 'Communication', 'Problem Solving'],
    avgSalary: '₹10-20 LPA',
    jobMarketDemand: 'High',
    learningPath: ['Cloud Fundamentals', 'AWS/Azure', 'Architecture Design', 'Security', 'Compliance'],
    companies: ['Accenture', 'Cognizant', 'Infosys', 'AWS']
  }
];

const exams = [
  {
    examName: 'GATE CSE',
    examType: 'Competitive',
    eligibility: 'Bachelor\'s degree in Engineering',
    examDate: new Date('2024-02-18'),
    applicationDeadline: new Date('2024-01-15'),
    resultDate: new Date('2024-03-20'),
    syllabus: ['Algorithms', 'Data Structures', 'Digital Logic', 'Databases', 'OS', 'Networking', 'Compiler Design'],
    applicationLink: 'https://gate.iisc.ac.in',
    preparationResources: ['GeeksforGeeks', 'NeetCode', 'LeetCode', 'GATE Overflow'],
    difficulty: 'Hard'
  },
  {
    examName: 'NIMCET',
    examType: 'Entrance',
    eligibility: 'Bachelor\'s degree (BCA, B.Tech, B.Sc)',
    examDate: new Date('2024-05-26'),
    applicationDeadline: new Date('2024-04-30'),
    resultDate: new Date('2024-06-15'),
    syllabus: ['Mathematics', 'Reasoning', 'General Awareness', 'Computer Science', 'Programming'],
    applicationLink: 'https://www.nimcet.in',
    preparationResources: ['NIMCET Previous Papers', 'Mathematics Shortcuts', 'Logic Puzzles'],
    difficulty: 'Medium'
  },
  {
    examName: 'CUET',
    examType: 'Entrance',
    eligibility: '10+2 or equivalent',
    examDate: new Date('2024-06-20'),
    applicationDeadline: new Date('2024-05-31'),
    resultDate: new Date('2024-07-15'),
    syllabus: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'General Knowledge'],
    applicationLink: 'https://cuet.nta.ac.in',
    preparationResources: ['NCERT Books', 'CUET Mock Tests', 'Previous Papers'],
    difficulty: 'Medium'
  },
  {
    examName: 'AWS Solutions Architect',
    examType: 'Certification',
    eligibility: 'AWS Account and basic cloud knowledge',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['EC2', 'S3', 'Lambda', 'RDS', 'VPC', 'IAM', 'Cloud Architecture'],
    applicationLink: 'https://aws.amazon.com/certification/',
    preparationResources: ['A Cloud Guru', 'Linux Academy', 'AWS Whitepapers', 'Tutorials Dojo'],
    difficulty: 'Medium'
  },
  {
    examName: 'Google Cloud Associate',
    examType: 'Certification',
    eligibility: 'Basic cloud knowledge recommended',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['Compute', 'Storage', 'Networking', 'Databases', 'Security', 'Machine Learning'],
    applicationLink: 'https://cloud.google.com/certification',
    preparationResources: ['Google Cloud Training', 'Pluralsight', 'A Cloud Guru'],
    difficulty: 'Medium'
  },
  {
    examName: 'Kubernetes Administrator',
    examType: 'Certification',
    eligibility: 'Docker and Kubernetes experience required',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['Pod Management', 'Networking', 'Storage', 'Security', 'Troubleshooting'],
    applicationLink: 'https://www.cncf.io/certification/ckad/',
    preparationResources: ['KodeKloud', 'Linux Academy', 'Kubernetes Docs'],
    difficulty: 'Hard'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skill2success', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await CareerProfile.deleteMany({});
    await Exam.deleteMany({});

    // Insert career profiles
    await CareerProfile.insertMany(careerProfiles);
    console.log(`${careerProfiles.length} career profiles added`);

    // Insert exams
    await Exam.insertMany(exams);
    console.log(`${exams.length} exams added`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
