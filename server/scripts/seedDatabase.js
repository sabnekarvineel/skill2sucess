/**
 * Database Seeding Script
 * This script initializes the database with sample career profiles and exams
 * Run: node server/scripts/seedDatabase.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const CareerProfile = require('../models/CareerProfile');
const Exam = require('../models/Exam');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill2success';

const careerProfiles = [
  {
    jobRole: 'Full Stack Developer',
    description: 'Build complete web applications from frontend to backend',
    requiredSkills: {
      programming: ['JavaScript', 'Python', 'Java'],
      databases: ['MongoDB', 'SQL', 'Redis'],
      frameworks: ['React', 'Node.js', 'Express'],
      tools: ['Git', 'Docker', 'REST APIs']
    },
    softSkills: ['Communication', 'Problem-solving', 'Teamwork', 'Adaptability'],
    avgSalary: '₹6-15 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Learn JavaScript fundamentals',
      'Master React for frontend',
      'Learn Node.js for backend',
      'Database design and SQL',
      'Deploy with Docker'
    ],
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Twitter']
  },
  {
    jobRole: 'Frontend Developer',
    description: 'Create engaging user interfaces and web experiences',
    requiredSkills: {
      programming: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
      databases: [],
      frameworks: ['React', 'Vue.js', 'Angular'],
      tools: ['Git', 'Webpack', 'npm', 'Chrome DevTools']
    },
    softSkills: ['UI/UX awareness', 'Attention to detail', 'Creativity', 'Communication'],
    avgSalary: '₹5-12 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'HTML & CSS fundamentals',
      'JavaScript mastery',
      'React framework',
      'UI/UX principles',
      'Performance optimization'
    ],
    companies: ['Google', 'Amazon', 'Meta', 'Netflix', 'Spotify']
  },
  {
    jobRole: 'Backend Developer',
    description: 'Build scalable server-side applications and APIs',
    requiredSkills: {
      programming: ['Python', 'Java', 'C++', 'Go'],
      databases: ['SQL', 'MongoDB', 'PostgreSQL', 'Redis'],
      frameworks: ['Django', 'Spring', 'Express', 'FastAPI'],
      tools: ['Docker', 'Kubernetes', 'Jenkins', 'AWS']
    },
    softSkills: ['System design', 'Problem-solving', 'Debugging', 'Documentation'],
    avgSalary: '₹6-14 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Choose a programming language',
      'Database design and optimization',
      'API design patterns',
      'Cloud deployment',
      'Microservices architecture'
    ],
    companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn', 'Uber']
  },
  {
    jobRole: 'Data Scientist',
    description: 'Extract insights from data using statistical and ML techniques',
    requiredSkills: {
      programming: ['Python', 'R', 'SQL'],
      databases: ['SQL', 'MongoDB', 'Spark'],
      frameworks: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas'],
      tools: ['Jupyter', 'Git', 'Tableau', 'Apache Spark']
    },
    softSkills: ['Statistical thinking', 'Communication', 'Data visualization', 'Curiosity'],
    avgSalary: '₹8-18 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Python programming',
      'Statistics and probability',
      'Machine learning algorithms',
      'Deep learning',
      'Big data technologies'
    ],
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Meta']
  },
  {
    jobRole: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines',
    requiredSkills: {
      programming: ['Python', 'Bash', 'Go'],
      databases: ['PostgreSQL', 'MongoDB'],
      frameworks: ['Docker', 'Kubernetes', 'Jenkins'],
      tools: ['Linux', 'Git', 'AWS', 'Terraform']
    },
    softSkills: ['System thinking', 'Reliability focus', 'Problem-solving', 'Communication'],
    avgSalary: '₹7-16 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Linux fundamentals',
      'Containerization with Docker',
      'Kubernetes orchestration',
      'CI/CD pipelines',
      'Cloud platforms (AWS/GCP)'
    ],
    companies: ['Amazon', 'Google', 'Microsoft', 'Netflix', 'Uber']
  },
  {
    jobRole: 'Mobile Developer',
    description: 'Build native and cross-platform mobile applications',
    requiredSkills: {
      programming: ['JavaScript', 'Kotlin', 'Swift'],
      databases: ['SQLite', 'Firebase', 'Realm'],
      frameworks: ['React Native', 'Flutter', 'Xamarin'],
      tools: ['Android Studio', 'Xcode', 'Git', 'Firebase']
    },
    softSkills: ['UI/UX focus', 'Problem-solving', 'Attention to detail', 'Adaptability'],
    avgSalary: '₹6-13 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Choose platform (iOS/Android)',
      'Native development',
      'Cross-platform frameworks',
      'App optimization',
      'Deployment and publishing'
    ],
    companies: ['Google', 'Apple', 'Facebook', 'Microsoft', 'Airbnb']
  },
  {
    jobRole: 'Cloud Architect',
    description: 'Design and manage cloud infrastructure solutions',
    requiredSkills: {
      programming: ['Python', 'Go', 'Java'],
      databases: ['DynamoDB', 'RDS', 'CloudSQL'],
      frameworks: ['AWS', 'Azure', 'GCP'],
      tools: ['Terraform', 'CloudFormation', 'Docker', 'Kubernetes']
    },
    softSkills: ['System design', 'Leadership', 'Communication', 'Strategic thinking'],
    avgSalary: '₹12-25 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Cloud fundamentals',
      'AWS/Azure/GCP mastery',
      'Infrastructure as Code',
      'Security best practices',
      'Cost optimization'
    ],
    companies: ['Amazon', 'Microsoft', 'Google', 'Oracle', 'IBM']
  },
  {
    jobRole: 'Machine Learning Engineer',
    description: 'Develop and deploy machine learning models',
    requiredSkills: {
      programming: ['Python', 'Scala', 'Java'],
      databases: ['SQL', 'MongoDB', 'Spark'],
      frameworks: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'XGBoost'],
      tools: ['Jupyter', 'MLflow', 'Git', 'Docker']
    },
    softSkills: ['Problem-solving', 'Experimentation', 'Communication', 'Statistical thinking'],
    avgSalary: '₹8-20 LPA',
    jobMarketDemand: 'High',
    learningPath: [
      'Python mastery',
      'Statistics and probability',
      'Machine learning algorithms',
      'Deep learning frameworks',
      'Model deployment'
    ],
    companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Tesla']
  }
];

const exams = [
  {
    examName: 'GATE (Graduate Aptitude Test in Engineering)',
    examType: 'Entrance',
    eligibility: 'B.Tech/B.E.',
    examDate: '2024-02-20',
    applicationDeadline: '2024-01-20',
    resultDate: '2024-03-15',
    syllabus: ['Data Structures', 'Algorithms', 'Digital Logic', 'DBMS', 'Networks', 'OS'],
    applicationLink: 'https://gate.iisc.ac.in',
    preparationResources: ['Made Easy', 'Ace Academy', 'NPTEL', 'GFG'],
    difficulty: 'Hard'
  },
  {
    examName: 'JEE Advanced',
    examType: 'Entrance',
    eligibility: 'JEE Main qualified',
    examDate: '2024-06-05',
    applicationDeadline: '2024-05-15',
    resultDate: '2024-07-01',
    syllabus: ['Physics', 'Chemistry', 'Mathematics'],
    applicationLink: 'https://www.jeeadv.ac.in/',
    preparationResources: ['Coaching institutes', 'Online courses', 'Mock tests'],
    difficulty: 'Hard'
  },
  {
    examName: 'NIMCET (NIT Master of Computer Applications)',
    examType: 'Entrance',
    eligibility: 'B.Tech/BCA/B.Sc',
    examDate: '2024-04-10',
    applicationDeadline: '2024-03-15',
    resultDate: '2024-05-10',
    syllabus: ['Data Structures', 'Algorithms', 'Discrete Mathematics', 'C Programming'],
    applicationLink: 'https://nimcet.org/',
    preparationResources: ['GeeksforGeeks', 'PrepBytes', 'Coding Ninjas'],
    difficulty: 'Hard'
  },
  {
    examName: 'AWS Certified Solutions Architect',
    examType: 'Certification',
    eligibility: 'Any undergraduate',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['EC2', 'S3', 'RDS', 'CloudFront', 'IAM', 'VPC', 'Lambda'],
    applicationLink: 'https://aws.amazon.com/certification/',
    preparationResources: ['A Cloud Guru', 'Linux Academy', 'Udemy'],
    difficulty: 'Hard'
  },
  {
    examName: 'Oracle Certified Associate Java Programmer',
    examType: 'Certification',
    eligibility: 'Any undergraduate',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['Java Basics', 'OOP', 'Collections', 'Exception Handling', 'Streams'],
    applicationLink: 'https://www.oracle.com/certification/',
    preparationResources: ['Oracle Docs', 'Udemy', 'Whizlabs'],
    difficulty: 'Medium'
  },
  {
    examName: 'Google Cloud Professional Cloud Architect',
    examType: 'Certification',
    eligibility: 'Cloud experience required',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['GCP services', 'Architecture design', 'Security', 'Data management'],
    applicationLink: 'https://cloud.google.com/certification',
    preparationResources: ['Google Cloud Training', 'Pluralsight', 'Udemy'],
    difficulty: 'Hard'
  },
  {
    examName: 'Certified Kubernetes Administrator (CKA)',
    examType: 'Certification',
    eligibility: 'Docker experience recommended',
    examDate: null,
    applicationDeadline: null,
    resultDate: null,
    syllabus: ['Kubernetes cluster', 'Workloads', 'Services', 'Storage', 'Troubleshooting'],
    applicationLink: 'https://www.cncf.io/certification/cka/',
    preparationResources: ['Kubernetes.io', 'Linux Academy', 'Killer.sh'],
    difficulty: 'Hard'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await CareerProfile.deleteMany({});
    await Exam.deleteMany({});
    console.log('Cleared existing data');

    // Insert career profiles
    const insertedProfiles = await CareerProfile.insertMany(careerProfiles);
    console.log(`✅ Inserted ${insertedProfiles.length} career profiles`);

    // Insert exams
    const insertedExams = await Exam.insertMany(exams);
    console.log(`✅ Inserted ${insertedExams.length} exams`);

    console.log('\n✅ Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
