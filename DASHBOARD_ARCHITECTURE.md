# Dashboard Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT SIDE (React)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐      ┌──────────────────┐                │
│  │  App.js          │      │  Dashboard.js    │                │
│  │  (Routes)        │      │  (Main Hub)      │                │
│  └────────┬─────────┘      └────────┬─────────┘                │
│           │                         │                          │
│    ┌──────┴──────────────────────────┴──────┐                  │
│    │                                        │                  │
│    ▼                                        ▼                  │
│ ┌──────────────┐              ┌──────────────────┐             │
│ │SkillsForm   │              │  UserDashboard   │             │
│ │(Input Data) │              │(Display & Rec)   │             │
│ └──────┬───────┘              └────────┬─────────┘             │
│        │                              │                       │
│        │ PUT /api/users/skills        │ GET /api/users/prof  │
│        │ PUT /api/users/hobbies       │ GET /api/recommendat │
│        │ PUT /api/users/interests     │                       │
│        │                              │                       │
└────────┼──────────────────────────────┼───────────────────────┘
         │                              │
         │ HTTP/JSON                    │
         │ (axios)                      │
         │                              │
┌────────┼──────────────────────────────┼───────────────────────┐
│        │        SERVER SIDE (Express)│                        │
│        │                              │                       │
│        ▼                              ▼                       │
│ ┌──────────────────────┐    ┌──────────────────────┐          │
│ │ users.js             │    │recommendations.js    │          │
│ │ ─────────────────    │    │ ────────────────     │          │
│ │ PUT /skills          │    │ GET /analysis        │          │
│ │ PUT /hobbies         │    │                      │          │
│ │ PUT /interests       │    │ Returns:             │          │
│ │ GET /profile         │    │ - jobRoles[]         │          │
│ │                      │    │ - skillGaps[]        │          │
│ │ Updates MongoDB      │    │ - resources[]        │          │
│ │                      │    │ - higherStudies[]    │          │
│ └──────────────────────┘    └──────────────────────┘          │
│        │                              │                       │
│        └──────────────┬───────────────┘                        │
│                       │                                        │
│                       ▼                                        │
│        ┌──────────────────────────┐                            │
│        │   MongoDB (User Data)    │                            │
│        │  ────────────────────    │                            │
│        │  - fullName              │                            │
│        │  - email                 │                            │
│        │  - skills{}              │                            │
│        │  - interests[]           │                            │
│        │  - hobbies[]             │                            │
│        │  - careerRecommendations │                            │
│        └──────────────────────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Navbar
├── Routes
│   ├── Home
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   │   ├── Cards (4)
│   │   └── Info Section
│   ├── UserDashboard ⭐ NEW
│   │   ├── Header
│   │   └── Grid Layout
│   │       ├── Left Column
│   │       │   ├── Personal Info Card
│   │       │   ├── Programming Languages Card
│   │       │   └── Interests Card
│   │       └── Right Column
│   │           ├── Frameworks Card
│   │           ├── Databases Card
│   │           ├── Tools Card
│   │           └── Soft Skills Card
│   │   ├── Career Recommendations Section
│   │   ├── Skill Gaps Section
│   │   ├── Learning Resources Section
│   │   └── Higher Education Section
│   ├── SkillsForm
│   │   ├── Programming Input
│   │   ├── Frameworks Input
│   │   ├── Databases Input
│   │   ├── Tools Input
│   │   ├── Soft Skills Input
│   │   ├── Other Skills Input ⭐ NEW
│   │   ├── Interests Input
│   │   ├── Hobbies Input ⭐ NEW
│   │   └── Submit Button
│   ├── Recommendations
│   └── Exams
```

## Data Flow Diagram

### 1. User Registration → Profile Creation
```
User Registration
        │
        ▼
Create User Document
  ├── fullName
  ├── email
  ├── password (hashed)
  ├── degree
  ├── semester
  ├── cgpa
  ├── skills: { programming: [], databases: [], ... }
  ├── interests: []
  ├── hobbies: []
  └── careerRecommendations: {}
```

### 2. Skills Update → Recommendation Generation
```
User Adds Skills
  (SkillsForm.js)
        │
        ▼
PUT /api/users/skills
        │
        ▼
User.findByIdAndUpdate()
  (Saves to MongoDB)
        │
        ▼
User views /profile
        │
        ▼
GET /api/recommendations/analysis
        │
        ▼
Recommendation Engine Processes:
  1. Read user skills from DB
  2. Compare with 8 career paths
  3. Calculate suitability (%)
  4. Identify missing skills
  5. Generate resource links
  6. Return analysis
        │
        ▼
UserDashboard.js
  Displays recommendations
        │
        ▼
User sees Beautiful Cards
  with pastel colors
```

### 3. Recommendation Generation Logic

```
Skill Matching Algorithm
      │
      ├─ Get all user skills (flattened)
      ├─ For each career path:
      │   ├─ Get required skills
      │   ├─ Count matching skills
      │   │  └─ Match: user skill includes required
      │   │     OR required includes user skill
      │   ├─ Calculate percentage
      │   │  └─ (matched / required) × 100
      │   └─ Identify missing skills
      │
      ├─ Sort careers by suitability
      ├─ Collect all missing skills
      ├─ Select top 5 most important
      │
      ├─ For each gap, find resources
      │  └─ Match gap category to SKILL_RESOURCES
      │
      ├─ Generate study suggestions
      ├─ Determine overall skill level
      │
      └─ Return complete analysis object
            ├─ jobRoles[] (sorted by score)
            ├─ skillGaps[] (top 5)
            ├─ resources[] (curated)
            ├─ higherStudies[]
            ├─ recommendedPath (top 1)
            └─ overallSkillLevel
```

## Database Schema

### User Document
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (bcrypt hashed),
  degree: String,
  semester: Number,
  cgpa: Number,
  
  // Skills organized by category
  skills: {
    programming: [String],      // Python, Java, JavaScript
    databases: [String],        // MySQL, MongoDB
    frameworks: [String],       // React, Django
    tools: [String],           // Git, Docker
    softSkills: [String],      // Communication, Leadership
    other: [String]            // REST APIs, GraphQL
  },
  
  // Professional interests
  interests: [String],         // Web Dev, Data Science
  hobbies: [String],          // Coding, Gaming
  
  // Cached recommendations
  careerRecommendations: {
    jobRoles: [{
      role: String,
      suitabilityScore: Number,
      description: String,
      matchingSkills: [String],
      missingSkills: [String],
      recommendations: [String]
    }],
    skillGaps: [String],
    higherStudies: [String],
    resources: [{
      title: String,
      category: String,
      level: String,
      description: String,
      link: String
    }]
  },
  
  role: String (enum: 'student', 'admin'),
  registeredAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### User Management
```
POST   /api/auth/register          - Create account
POST   /api/auth/login             - Login
GET    /api/auth/me                - Get current user
GET    /api/users/profile          - Get full profile ⭐
PUT    /api/users/skills           - Update skills ⭐
PUT    /api/users/interests        - Update interests ⭐
PUT    /api/users/hobbies          - Update hobbies ⭐
```

### Recommendations
```
GET    /api/recommendations/analysis - Get recommendations ⭐
```

## Styling Architecture

### CSS Organization
```
UserDashboard.css
├── Root Variables (pastel colors)
├── General Styles
├── Loading/Error States
├── Dashboard Grid
├── Card Styles
│   ├── Individual card backgrounds
│   ├── Card headers
│   └── Card content
├── Info Grid (personal info)
├── Skills Display
│   ├── Skills container
│   ├── Skill tags (6 colors)
│   └── Tag hover effects
├── Recommendations Section
│   ├── Recommendation items
│   ├── Suitability scores
│   ├── Recommendation sections
│   ├── Matching/Missing skills
│   └── Recommendation lists
├── Skill Gaps
├── Resources Section
│   ├── Resource items
│   ├── Resource headers
│   └── Resource links
├── Higher Education
└── Responsive Breakpoints
    ├── Desktop (1200px+)
    ├── Tablet (768px-1199px)
    └── Mobile (<768px)
```

## Career Paths Mapping

```
Career Path Analysis
├── Full Stack Developer
│   ├── Required: JS, React, Node.js, MongoDB, REST APIs
│   ├── Avg Salary: ₹6-15 LPA
│   └── Growth: High
├── Frontend Developer
│   ├── Required: JS, React, CSS, HTML, UI/UX
│   └── Growth: High
├── Backend Developer
│   ├── Required: Node.js, Python, SQL, DB Design, APIs
│   └── Growth: High
├── Data Scientist
│   ├── Required: Python, ML, Stats, SQL, Data Analysis
│   └── Growth: Very High
├── DevOps Engineer
│   ├── Required: Linux, Docker, Kubernetes, CI/CD, Cloud
│   └── Growth: High
├── Mobile Developer
│   ├── Required: React Native, JS, Mobile UI, APIs
│   └── Growth: High
├── Cloud Architect
│   ├── Required: AWS, Azure, Cloud Design, Security
│   └── Growth: Very High
└── Software Architect
    ├── Required: System Design, Multiple Languages, Leadership
    └── Growth: High
```

## Resource Categories Mapping

```
Skill Gaps → Learning Resources
├── Web Development
│   ├── The Complete Web Dev Bootcamp
│   └── MDN Web Docs
├── Mobile Development
│   ├── React Native Docs
│   └── Flutter
├── Data Science
│   ├── Andrew Ng's ML Course
│   └── Fast.ai
├── DevOps
│   ├── Docker Docs
│   └── Kubernetes Tutorial
├── Cloud Computing
│   ├── AWS Certified Solutions
│   └── Google Cloud Docs
├── Database Design
│   ├── SQL Tutorial
│   └── MongoDB University
└── Cybersecurity
    ├── OWASP Top 10
    └── Cybrary
```

## Performance Considerations

### Optimization Strategies
```
Frontend
├── API calls parallelized
├── CSS uses variables for theming
├── Responsive design (mobile-first)
├── Error boundaries for graceful degradation
└── Loading states for UX

Backend
├── Database indexes on userId
├── Calculation cached in user document
├── No N+1 queries
├── Efficient string matching in recommendation engine
└── Minimal database operations

Caching
├── Recommendations cached in user document
├── Only recalculated on skills update
└── Reduces API response time
```

## Security Features

```
Authentication
├── JWT tokens for session
├── Stored in localStorage
├── Included in Authorization header
└── Validated on backend

Authorization
├── auth middleware checks token
├── User can only access own data
├── Admin endpoints protected
└── Password hashed with bcryptjs

Data Protection
├── Passwords never sent to frontend
├── Sensitive data excluded from responses
└── CORS enabled for frontend domain
```

---

**Last Updated**: February 2025
**Architecture Version**: 1.0
