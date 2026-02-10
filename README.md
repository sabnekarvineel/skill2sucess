# Skill2Success - Career Recommendation System

A comprehensive MERN stack application that provides personalized career guidance for CS/IT students.

## Features

- **User Authentication**: Secure registration and login system
- **Skill Management**: Track programming languages, frameworks, databases, tools, and soft skills
- **Career Recommendations**: Get personalized job role recommendations with suitability scores
- **Higher Education Options**: Explore postgraduate degree programs (MCA, M.Tech, M.Sc)
- **Entrance Exams**: Complete information about competitive and entrance exams
- **Skill Gap Analysis**: Identify missing skills and get improvement recommendations
- **Admin Panel**: Manage career profiles, exams, and system data

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **JWT** for authentication
- **Bcrypt** for password hashing

### Frontend
- **React** 18.2
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with Flexbox and Grid for styling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the root directory:
```bash
cd skill2sucess
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root:
```
MONGODB_URI=mongodb://localhost:27017/skill2success
JWT_SECRET=skill2success_secret_key
PORT=5000
```

4. Start MongoDB (if using local):
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
```

5. Start the backend server:
```bash
npm run server
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Run Both Simultaneously

From root directory:
```bash
npm run dev
```

## Project Structure

```
skill2sucess/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── CareerProfile.js
│   │   └── Exam.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── career.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SkillsForm.js
│   │   │   ├── Recommendations.js
│   │   │   └── Exams.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### User
- `PUT /api/users/skills` - Update user skills
- `PUT /api/users/interests` - Update user interests
- `GET /api/users/profile` - Get user profile

### Career
- `GET /api/career/recommendations` - Get personalized recommendations
- `GET /api/career/profiles` - Get all career profiles
- `GET /api/career/exams` - Get all exams

### Admin (requires admin role)
- `POST /api/admin/career-profiles` - Add career profile
- `PUT /api/admin/career-profiles/:id` - Update career profile
- `POST /api/admin/exams` - Add exam
- `PUT /api/admin/exams/:id` - Update exam
- `DELETE /api/admin/exams/:id` - Delete exam

## Usage

### For Students
1. Register with your academic details
2. Add your technical skills, frameworks, databases, and soft skills
3. Specify your career interests
4. View personalized job role recommendations with suitability scores
5. Explore higher education options
6. Check entrance exams with dates and resources
7. Review skill gaps and improvement recommendations

### For Admins
1. Login with admin account
2. Manage career profiles and job roles
3. Update exam information, dates, and syllabus
4. Monitor user registrations and activity

## Features Breakdown

### Suitability Score Calculation
- Compares user skills with required skills for each job role
- Score = (Matching Skills / Total Required Skills) × 100
- Scores below 70% trigger improvement recommendations

### Skill Recommendations
- Identifies missing skills for target roles
- Provides specific improvement tips
- Suggests related certifications

### Smart Recommendations
- Job roles ranked by compatibility
- Higher education paths based on interests
- Relevant entrance exams for career goals
- Consolidated skill gap analysis

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Responsive Design

- Desktop (1920px and above)
- Tablet (768px to 1919px)
- Mobile (below 768px)

## Color Scheme

- Primary: #6366f1 (Indigo)
- Secondary: #ec4899 (Pink)
- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Danger: #ef4444 (Red)

## Future Enhancements

- Integration with job portals
- Internship opportunities
- Project portfolio builder
- Resume optimizer
- Mock interview platform
- Skill-based job alerts
- Community forum
- Mentorship matching

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using Atlas

### CORS Issues
- Check if backend server is running on port 5000
- Verify proxy setting in client/package.json

### Port Already in Use
```bash
# Change PORT in .env
# Or kill existing process:
# Windows: taskkill /PID <pid> /F
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC

## Support

For issues or questions, please create an issue in the repository.

---

**Map Your Skills. Plan Your Future.** 🎯
