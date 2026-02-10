const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Domain-specific skill recommendations database
const DOMAIN_SKILLS = {
  'Web Development': {
    essential: ['HTML', 'CSS', 'JavaScript'],
    advanced: ['React', 'Vue.js', 'Angular', 'TypeScript'],
    backend: ['Node.js', 'Express', 'Django', 'Flask', 'Python'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
    tools: ['Git', 'VS Code', 'Webpack', 'npm/yarn', 'REST APIs'],
    softSkills: ['Problem Solving', 'Communication', 'Time Management'],
    resources: [
      {
        title: 'The Complete Web Development Bootcamp',
        link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
        type: 'Course'
      },
      {
        title: 'MDN Web Docs',
        link: 'https://developer.mozilla.org/',
        type: 'Documentation'
      }
    ],
    relatedRoles: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer']
  },
  'Mobile Development': {
    essential: ['JavaScript', 'Mobile UI/UX', 'APIs'],
    advanced: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    backend: ['Node.js', 'Firebase', 'Express'],
    databases: ['Firebase', 'Realm', 'SQLite'],
    tools: ['Android Studio', 'Xcode', 'Git', 'Postman'],
    softSkills: ['Design Thinking', 'Creativity', 'Problem Solving'],
    resources: [
      {
        title: 'React Native Official Docs',
        link: 'https://reactnative.dev/',
        type: 'Documentation'
      },
      {
        title: 'Flutter Documentation',
        link: 'https://flutter.dev/',
        type: 'Documentation'
      }
    ],
    relatedRoles: ['Mobile Developer', 'Flutter Developer', 'iOS Developer', 'Android Developer']
  },
  'Data Science': {
    essential: ['Python', 'Statistics', 'Data Analysis'],
    advanced: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
    backend: ['Python', 'R', 'SQL'],
    databases: ['PostgreSQL', 'MongoDB', 'SQL'],
    tools: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Jupyter Notebook'],
    softSkills: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Critical Thinking'],
    resources: [
      {
        title: 'Andrew Ng Machine Learning Course',
        link: 'https://www.coursera.org/learn/machine-learning',
        type: 'Course'
      },
      {
        title: 'Fast.ai Practical Deep Learning',
        link: 'https://www.fast.ai/',
        type: 'Course'
      }
    ],
    relatedRoles: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst']
  },
  'Cloud Computing': {
    essential: ['Linux', 'Networking', 'System Administration'],
    advanced: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker'],
    backend: ['Node.js', 'Python', 'Java'],
    databases: ['SQL', 'DynamoDB', 'Cloud SQL'],
    tools: ['Terraform', 'CloudFormation', 'Docker', 'Kubernetes', 'Jenkins'],
    softSkills: ['System Design', 'Problem Solving', 'Leadership'],
    resources: [
      {
        title: 'AWS Certified Solutions Architect',
        link: 'https://aws.amazon.com/training/',
        type: 'Certification'
      },
      {
        title: 'Linux Academy',
        link: 'https://linuxacademy.com/',
        type: 'Course'
      }
    ],
    relatedRoles: ['Cloud Architect', 'DevOps Engineer', 'Cloud Engineer']
  },
  'DevOps': {
    essential: ['Linux', 'Bash', 'Git'],
    advanced: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Ansible'],
    backend: ['Python', 'Go', 'Bash'],
    databases: ['PostgreSQL', 'MySQL', 'Redis'],
    tools: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Docker', 'Kubernetes'],
    softSkills: ['Problem Solving', 'Communication', 'Automation mindset'],
    resources: [
      {
        title: 'The Complete Hands-On Introduction to Apache Kafka',
        link: 'https://www.udemy.com/course/apache-kafka/',
        type: 'Course'
      },
      {
        title: 'DevOps Engineering Course',
        link: 'https://www.udemy.com/course/deloitte-devops-engineering/',
        type: 'Course'
      }
    ],
    relatedRoles: ['DevOps Engineer', 'Site Reliability Engineer', 'Infrastructure Engineer']
  },
  'Cybersecurity': {
    essential: ['Networking', 'Linux', 'Windows Security'],
    advanced: ['Penetration Testing', 'Cryptography', 'Security Architecture', 'Incident Response'],
    backend: ['Python', 'C', 'Java'],
    databases: ['SQL', 'MySQL'],
    tools: ['Metasploit', 'Wireshark', 'Burp Suite', 'OWASP', 'Nessus'],
    softSkills: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Attention to Detail'],
    resources: [
      {
        title: 'OWASP Top 10',
        link: 'https://owasp.org/www-project-top-ten/',
        type: 'Guide'
      },
      {
        title: 'Cybrary Free Cybersecurity Training',
        link: 'https://www.cybrary.it/',
        type: 'Course'
      }
    ],
    relatedRoles: ['Security Analyst', 'Penetration Tester', 'Security Architect']
  },
  'AI/Machine Learning': {
    essential: ['Python', 'Mathematics', 'Statistics'],
    advanced: ['Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
    backend: ['Python', 'TensorFlow', 'PyTorch'],
    databases: ['SQL', 'MongoDB', 'Big Data'],
    tools: ['TensorFlow', 'PyTorch', 'Jupyter', 'Pandas', 'Scikit-learn'],
    softSkills: ['Analytical Thinking', 'Research Skills', 'Problem Solving'],
    resources: [
      {
        title: 'Deep Learning Specialization',
        link: 'https://www.coursera.org/specializations/deep-learning',
        type: 'Specialization'
      },
      {
        title: 'Fast.ai Practical Deep Learning',
        link: 'https://www.fast.ai/',
        type: 'Course'
      }
    ],
    relatedRoles: ['AI Engineer', 'Machine Learning Engineer', 'Research Scientist']
  },
  'Blockchain': {
    essential: ['Cryptography', 'Networking', 'Solidity'],
    advanced: ['Smart Contracts', 'DeFi', 'Web3', 'Ethereum', 'Blockchain Architecture'],
    backend: ['Solidity', 'JavaScript', 'Python'],
    databases: ['Distributed Ledger', 'SQL'],
    tools: ['MetaMask', 'Truffle', 'Hardhat', 'Web3.js', 'Remix IDE'],
    softSkills: ['Problem Solving', 'Innovation', 'Cryptography Knowledge'],
    resources: [
      {
        title: 'Ethereum Official Documentation',
        link: 'https://ethereum.org/en/developers/',
        type: 'Documentation'
      },
      {
        title: 'Solidity Programming Language',
        link: 'https://docs.soliditylang.org/',
        type: 'Documentation'
      }
    ],
    relatedRoles: ['Blockchain Developer', 'Smart Contract Developer', 'Crypto Engineer']
  },
  'Data Engineering': {
    essential: ['Python', 'SQL', 'Big Data'],
    advanced: ['Apache Spark', 'Hadoop', 'ETL', 'Data Pipelines', 'Stream Processing'],
    backend: ['Python', 'Scala', 'Java'],
    databases: ['PostgreSQL', 'Cassandra', 'Hive'],
    tools: ['Apache Spark', 'Airflow', 'Kafka', 'Hive', 'Presto'],
    softSkills: ['Problem Solving', 'System Design', 'Communication'],
    resources: [
      {
        title: 'The Complete Hands-On Introduction to Apache Spark',
        link: 'https://www.udemy.com/course/apache-spark/',
        type: 'Course'
      },
      {
        title: 'Data Engineering with Python',
        link: 'https://www.udemy.com/course/the-complete-hands-on-introduction-to-apache-airflow/',
        type: 'Course'
      }
    ],
    relatedRoles: ['Data Engineer', 'Big Data Engineer', 'ETL Developer']
  }
};

// Get domain-based skill suggestions
router.post('/suggest', auth, (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ message: 'Domain is required' });
    }

    // Find matching domain (case-insensitive)
    const matchedDomain = Object.keys(DOMAIN_SKILLS).find(
      d => d.toLowerCase() === domain.toLowerCase()
    );

    if (!matchedDomain) {
      return res.status(404).json({
        message: `Domain "${domain}" not found`,
        availableDomains: Object.keys(DOMAIN_SKILLS)
      });
    }

    const domainData = DOMAIN_SKILLS[matchedDomain];

    // Calculate skill priority based on categories
    const skillPriorities = [
      {
        category: 'Essential Skills',
        skills: domainData.essential,
        priority: 1,
        description: 'Foundational skills you must master'
      },
      {
        category: 'Advanced Skills',
        skills: domainData.advanced,
        priority: 2,
        description: 'Specialized skills for expertise'
      },
      {
        category: 'Backend Technologies',
        skills: domainData.backend,
        priority: 3,
        description: 'Technologies to complement your domain'
      },
      {
        category: 'Databases',
        skills: domainData.databases,
        priority: 4,
        description: 'Database technologies relevant to this domain'
      },
      {
        category: 'Tools & Platforms',
        skills: domainData.tools,
        priority: 5,
        description: 'Essential tools for development'
      },
      {
        category: 'Soft Skills',
        skills: domainData.softSkills,
        priority: 6,
        description: 'Professional skills to develop'
      }
    ];

    const suggestion = {
      domain: matchedDomain,
      skillPriorities,
      resources: domainData.resources,
      relatedRoles: domainData.relatedRoles,
      learningPath: generateLearningPath(matchedDomain, domainData),
      estimatedMonths: calculateEstimatedTime(domainData),
      difficulty: assessDifficulty(domainData),
      marketDemand: getMarketDemand(matchedDomain),
      topCompanies: getTopCompanies(matchedDomain)
    };

    res.json(suggestion);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error generating suggestions', error: error.message });
  }
});

// Get all available domains
router.get('/domains', (req, res) => {
  try {
    const domains = Object.keys(DOMAIN_SKILLS).map(domain => ({
      name: domain,
      skillCount: (
        DOMAIN_SKILLS[domain].essential.length +
        DOMAIN_SKILLS[domain].advanced.length +
        DOMAIN_SKILLS[domain].backend.length +
        DOMAIN_SKILLS[domain].databases.length +
        DOMAIN_SKILLS[domain].tools.length
      ),
      relatedRoles: DOMAIN_SKILLS[domain].relatedRoles
    }));

    res.json({
      totalDomains: domains.length,
      domains: domains
    });
  } catch (error) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ message: 'Error fetching domains', error: error.message });
  }
});

// Helper function: Generate learning path
function generateLearningPath(domain, domainData) {
  const path = [];

  // Phase 1: Essentials
  path.push({
    phase: 'Phase 1: Foundations (Months 1-2)',
    skills: domainData.essential,
    description: 'Master the fundamental concepts and tools'
  });

  // Phase 2: Advanced
  path.push({
    phase: 'Phase 2: Core Technologies (Months 3-4)',
    skills: domainData.advanced.slice(0, 2),
    description: 'Learn primary technologies for this domain'
  });

  // Phase 3: Practical
  path.push({
    phase: 'Phase 3: Practical Application (Months 5-6)',
    skills: domainData.tools.slice(0, 3),
    description: 'Work with industry-standard tools'
  });

  // Phase 4: Specialization
  path.push({
    phase: 'Phase 4: Specialization (Months 7+)',
    skills: domainData.advanced.slice(2),
    description: 'Deepen expertise in advanced areas'
  });

  return path;
}

// Helper function: Calculate estimated time
function calculateEstimatedTime(domainData) {
  const totalSkills = (
    domainData.essential.length +
    domainData.advanced.length +
    domainData.backend.length +
    domainData.databases.length +
    domainData.tools.length
  );

  return Math.ceil(totalSkills / 3.5) + 2;
}

// Helper function: Assess difficulty
function assessDifficulty(domainData) {
  const totalSkills = (
    domainData.essential.length +
    domainData.advanced.length +
    domainData.backend.length
  );

  if (totalSkills > 15) return 'Very High';
  if (totalSkills > 12) return 'High';
  if (totalSkills > 8) return 'Moderate';
  return 'Beginner-Friendly';
}

// Helper function: Market demand
function getMarketDemand(domain) {
  const demandMap = {
    'Web Development': 'Very High',
    'Mobile Development': 'High',
    'Data Science': 'Very High',
    'Cloud Computing': 'Very High',
    'DevOps': 'Very High',
    'Cybersecurity': 'Very High',
    'AI/Machine Learning': 'Very High',
    'Blockchain': 'High',
    'Data Engineering': 'Very High'
  };

  return demandMap[domain] || 'High';
}

// Helper function: Top companies
function getTopCompanies(domain) {
  const companiesMap = {
    'Web Development': ['Google', 'Facebook', 'Amazon', 'Netflix', 'Microsoft'],
    'Mobile Development': ['Apple', 'Google', 'Samsung', 'Meta', 'Microsoft'],
    'Data Science': ['Google', 'Meta', 'Amazon', 'Microsoft', 'LinkedIn'],
    'Cloud Computing': ['Amazon', 'Microsoft', 'Google', 'IBM', 'Oracle'],
    'DevOps': ['Amazon', 'Netflix', 'Google', 'Meta', 'Uber'],
    'Cybersecurity': ['Microsoft', 'Google', 'Amazon', 'Cisco', 'Palo Alto Networks'],
    'AI/Machine Learning': ['Google', 'OpenAI', 'Meta', 'Microsoft', 'DeepMind'],
    'Blockchain': ['Ethereum', 'Consensys', 'Polygon', 'Binance', 'Coinbase'],
    'Data Engineering': ['Google', 'Uber', 'Netflix', 'Amazon', 'Meta']
  };

  return companiesMap[domain] || [];
}

module.exports = router;
