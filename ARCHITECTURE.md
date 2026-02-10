# Skill2Success - System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (React)                      │
├─────────────────────────────────────────────────────────────────┤
│ - Home Page          - Dashboard          - Skills Form          │
│ - Login/Register     - Recommendations    - Exam Info            │
└─────────────────────────────────────────────────────────────────┘
                              │
                       (Axios HTTP Calls)
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    API LAYER (Express.js)                        │
├─────────────────────────────────────────────────────────────────┤
│ ├── /auth         - User authentication                          │
│ ├── /users        - User profile & skills                        │
│ ├── /career       - Career recommendations & exams               │
│ └── /admin        - Admin management functions                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                      (Mongoose ODM)
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (MongoDB)                      │
├─────────────────────────────────────────────────────────────────┤
│ - Users Collection          - Career Profiles Collection         │
│ - Exams Collection                                               │
└─────────────────────────────────────────────────────────────────┘
```

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  degree: String,
  semester: Number,
  cgpa: Number,
  skills: {
    programming: [String],
    databases: [String],
    frameworks: [String],
    tools: [String],
    softSkills: [String]
  },
  interests: [String],
  careerRecommendations: {
    jobRoles: [],
    higherStudies: [],
    entranceExams: [],
    skillGaps: []
  },
  role: String (student|admin),
  registeredAt: Date,
  updatedAt: Date
}
```

### Career Profile Model
```javascript
{
  _id: ObjectId,
  jobRole: String (unique),
  description: String,
  requiredSkills: {
    programming: [String],
    databases: [String],
    frameworks: [String],
    tools: [String]
  },
  softSkills: [String],
  avgSalary: String,
  jobMarketDemand: String (High|Medium|Low),
  learningPath: [String],
  companies: [String],
  createdAt: Date
}
```

### Exam Model
```javascript
{
  _id: ObjectId,
  examName: String (unique),
  examType: String (Entrance|Competitive|Certification),
  eligibility: String,
  examDate: Date,
  applicationDeadline: Date,
  resultDate: Date,
  syllabus: [String],
  applicationLink: String,
  preparationResources: [String],
  difficulty: String (Easy|Medium|Hard),
  createdAt: Date,
  updatedAt: Date
}
```

## API Flow Diagrams

### Authentication Flow
```
User Registration
├─ POST /api/auth/register
│  ├─ Validate input
│  ├─ Check if user exists
│  ├─ Hash password with bcrypt
│  ├─ Save to database
│  └─ Return JWT token
└─ Client stores token in localStorage

User Login
├─ POST /api/auth/login
│  ├─ Find user by email
│  ├─ Verify password
│  └─ Return JWT token
└─ Client stores token in localStorage

Subsequent Requests
├─ Include token in Authorization header
├─ Middleware verifies token
└─ Grant access if valid
```

### Skill Recommendation Flow
```
User Input
├─ Skills added via SkillsForm
├─ PUT /api/users/skills
└─ Save to database

Generate Recommendations
├─ GET /api/career/recommendations
│  ├─ Fetch user's skills
│  ├─ Fetch all career profiles
│  ├─ For each role:
│  │  ├─ Calculate suitability score
│  │  ├─ Find matching skills
│  │  └─ Find missing skills
│  ├─ Rank by suitability
│  └─ Return recommendations
└─ Update user's careerRecommendations

Display Results
├─ Recommendations page
├─ Show scores with visual badges
├─ Highlight skill gaps
└─ Suggest improvements
```

## Component Hierarchy

```
App (Main Router)
├── Navbar (Global Navigation)
│   └── Navigation Links
├── Home (Landing Page)
│   ├── Hero Section
│   ├── Features Grid
│   ├── Stats Section
│   └── CTA Section
├── Login (Auth Page)
│   └── Login Form
├── Register (Auth Page)
│   └── Registration Form
├── Dashboard (User Hub)
│   ├── Profile Summary
│   └── Quick Access Cards
├── SkillsForm (Skill Management)
│   ├── Programming Languages
│   ├── Frameworks
│   ├── Databases
│   ├── Tools
│   ├── Soft Skills
│   └── Career Interests
├── Recommendations (Results)
│   ├── Job Roles Grid
│   ├── Higher Education Section
│   ├── Entrance Exams List
│   └── Skill Gaps Grid
└── Exams (Exam Information)
    ├── Filter Buttons
    └── Exam Cards
```

## State Management Flow

```
App Component
├─ user state (logged-in user data)
├─ token state (JWT token)
├─ loading state
└─ Helper functions:
   ├─ handleLogin()
   ├─ handleLogout()
   └─ setUser()

Page Components
├─ Local state for forms
├─ useEffect for API calls
├─ Axios interceptors for auth
└─ Update user state via context
```

## Authentication Flow (JWT)

```
1. User registers/logs in
   └─ Server generates JWT with userId and role
   
2. Client stores token
   └─ localStorage.setItem('token', token)
   
3. Client includes token in requests
   └─ Authorization: Bearer <token>
   
4. Server verifies token
   ├─ Extract token from header
   ├─ Verify signature with JWT_SECRET
   ├─ Decode token
   └─ Attach userId to request
   
5. Access granted/denied
   └─ Route handler processes request
```

## Skill Scoring Algorithm

```
calculateSuitability(userSkills, requiredSkills)

1. Initialize matchCount = 0
2. Initialize totalRequired = sum of all required skills
3. For each skill category:
   ├─ For each required skill:
   │  └─ If user has skill, increment matchCount
4. Calculate score = (matchCount / totalRequired) * 100
5. Return score (0-100)

Score Interpretation:
├─ 70-100: Good match (Green)
├─ 50-69: Moderate match (Yellow)
└─ 0-49: Needs improvement (Red)
```

## API Endpoint Security

```
Public Routes
├─ GET /api/health
├─ POST /api/auth/register
├─ POST /api/auth/login
├─ GET /api/career/profiles
└─ GET /api/career/exams

Protected Routes (require token)
├─ GET /api/auth/me
├─ PUT /api/users/skills
├─ PUT /api/users/interests
├─ GET /api/users/profile
└─ GET /api/career/recommendations

Admin Routes (require admin role)
├─ POST /api/admin/career-profiles
├─ PUT /api/admin/career-profiles/:id
├─ POST /api/admin/exams
├─ PUT /api/admin/exams/:id
└─ DELETE /api/admin/exams/:id
```

## Middleware Stack

```
Express Middleware Chain:
├─ cors() - Enable cross-origin requests
├─ express.json() - Parse JSON bodies
├─ Routes
│  └─ auth middleware for protected routes
│     └─ adminOnly middleware for admin routes
└─ Error handling
```

## Frontend State Flow

```
Initial Load
├─ Check if token exists in localStorage
├─ If yes, call GET /api/auth/me
├─ Set user state
└─ Display appropriate UI

User Registration
├─ POST /api/auth/register
├─ Store token in localStorage
├─ Set user state
└─ Redirect to /skills

Add Skills
├─ Select from dropdowns
├─ PUT /api/users/skills
├─ Update local component state
└─ Show success message

View Recommendations
├─ GET /api/career/recommendations
├─ Display results
├─ Highlight matching/missing skills
└─ Show improvement tips
```

## Data Flow Example: Getting Recommendations

```
1. User clicks "Recommendations" link
2. React Router navigates to /recommendations
3. Recommendations component mounts
   ├─ useEffect runs
   ├─ Calls axios.get('/api/career/recommendations')
   ├─ Includes Authorization header with token
   └─ Server processes request

4. Server:
   ├─ Verifies token (auth middleware)
   ├─ Gets userId from token
   ├─ Fetches user document from MongoDB
   ├─ Fetches all career profiles
   ├─ Calculates suitability for each role
   ├─ Generates response
   └─ Returns JSON to client

5. Client:
   ├─ Receives response data
   ├─ Sets recommendations state
   ├─ Re-renders component
   └─ Displays results

6. User views:
   ├─ Job roles sorted by compatibility
   ├─ Suitability scores
   ├─ Matching and missing skills
   ├─ Improvement recommendations
   └─ Higher education options
```

## Security Considerations

### Password Security
- Bcrypt hashing with salt rounds
- Never store plain text passwords

### JWT Security
- Secret key stored in .env
- Tokens expire in 7 days
- Tokens validated on each protected request

### Input Validation
- Email validation
- Required field checks
- Type validation

### CORS Protection
- Configured to allow frontend only
- Prevents unauthorized cross-origin requests

## Scalability Notes

### Current Design Supports:
- Multiple concurrent users
- Real-time skill recommendations
- Dynamic career profile additions
- Exam information updates

### Future Improvements:
- Caching with Redis
- Database indexing
- Load balancing
- Rate limiting
- Session management

---

**For deployment specifics, see README.md**
