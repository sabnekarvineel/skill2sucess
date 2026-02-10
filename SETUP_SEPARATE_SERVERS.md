# Running Backend and Frontend Separately

This guide explains how to run the backend and frontend independently while both connecting to MongoDB.

## Fixed Issues

✅ **Fixed:** `Route.get() requires a callback function but got a [object Object]` error in `server/routes/report.js`
   - The `auth` middleware was being imported incorrectly
   - Changed: `const auth = require('../middleware/auth')` 
   - To: `const { auth } = require('../middleware/auth')`

## Separate MongoDB Connections

### Backend MongoDB Connection
- **File:** `server/config/mongodb.js`
- **Purpose:** Centralized MongoDB connection for Node.js/Express backend
- **Used by:** `server/server.js`

### Frontend MongoDB Connection
- **File:** `client/src/api/mongodb.js`
- **Purpose:** API service to call backend MongoDB endpoints from React
- **Configuration:** Uses `.env.local` for API URL

## Quick Start

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
# Navigate to root directory
cd skill2sucess

# Run backend server
npm run server
# OR use the batch file
START_BACKEND.bat
```

The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
# Navigate to root directory
cd skill2sucess

# Run frontend client
npm run client
# OR use the batch file
START_FRONTEND.bat
```

The frontend will start on `http://localhost:3000`

### Option 2: Run Both Together
```bash
cd skill2sucess
npm run dev
```
This uses `concurrently` to run both in one terminal.

## Configuration Files

### Backend Configuration
- **File:** `server/config/mongodb.js`
- **Env:** Uses `MONGODB_URI` from `.env`
- Supports both local MongoDB and MongoDB Atlas

### Frontend Configuration
- **File:** `client/.env.local`
- **Variables:**
  - `REACT_APP_API_URL`: Backend API URL (default: `http://localhost:5000/api`)
  - `REACT_APP_ENV`: Environment (development/production)

## Available API Endpoints

The frontend `mongodb.js` file provides these API modules:

### User API
- `userAPI.getProfile()` - Get user profile
- `userAPI.updateProfile(data)` - Update user profile
- `userAPI.addSkill(skill)` - Add a skill
- `userAPI.getSkills()` - Get all user skills

### Career API
- `careerAPI.getProfiles()` - Get all career profiles
- `careerAPI.getProfile(id)` - Get specific career profile
- `careerAPI.createProfile(data)` - Create new career profile

### Report API
- `reportAPI.generateReport()` - Generate comprehensive report
- `reportAPI.getReportSummary()` - Get report summary
- `reportAPI.getCareerAnalysis(roleName)` - Get career analysis
- `reportAPI.getHigherStudies()` - Get higher studies recommendations
- `reportAPI.getExams()` - Get entrance exam recommendations

### Recommendations API
- `recommendationAPI.getRecommendations()` - Get recommendations
- `recommendationAPI.getSkillGaps()` - Get skill gaps

### Auth API
- `authAPI.login(email, password)` - User login
- `authAPI.register(userData)` - User registration
- `authAPI.logout()` - User logout
- `authAPI.getToken()` - Get JWT token
- `authAPI.isAuthenticated()` - Check if user is authenticated

### Admin API
- `adminAPI.getAllUsers()` - Get all users
- `adminAPI.getUserStats()` - Get user statistics
- `adminAPI.updateUser(id, data)` - Update user data

## Using API in Frontend Components

```jsx
import { reportAPI, userAPI } from '../api/mongodb';

function MyComponent() {
  const fetchReport = async () => {
    try {
      const report = await reportAPI.generateReport();
      console.log('Report:', report);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={fetchReport}>Generate Report</button>
  );
}
```

## Troubleshooting

### Backend won't start
1. Check if port 5000 is already in use
2. Ensure MongoDB is running locally or MongoDB Atlas credentials are set
3. Check `.env` file has correct `MONGODB_URI`

### Frontend can't connect to backend
1. Check if backend is running on port 5000
2. Check `.env.local` has correct `REACT_APP_API_URL`
3. Clear browser cache and reload

### MongoDB Connection Issues
1. **Local MongoDB:** Ensure MongoDB service is running
   ```bash
   # Windows: Check if MongoDB service is running
   Get-Service MongoDB
   
   # Start if not running
   Start-Service MongoDB
   ```

2. **MongoDB Atlas:** Verify connection string in `.env`
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill2success
   ```

## Environment Variables

### `.env` (Backend)
```
MONGODB_URI=mongodb://localhost:27017/skill2success
PORT=5000
JWT_SECRET=your_secret_key
```

### `client/.env.local` (Frontend)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Files Modified/Created

✅ **Modified:**
- `server/routes/report.js` - Fixed auth import
- `server/server.js` - Refactored MongoDB connection

✅ **Created:**
- `server/config/mongodb.js` - Backend MongoDB connection module
- `client/src/api/mongodb.js` - Frontend API service layer
- `client/.env.local` - Frontend environment configuration
- `START_BACKEND.bat` - Backend startup script
- `START_FRONTEND.bat` - Frontend startup script
- `SETUP_SEPARATE_SERVERS.md` - This guide

## Next Steps

1. Ensure MongoDB is running
2. Set up `.env` with correct MongoDB URI
3. Run backend and frontend separately or together
4. Test API endpoints from frontend using the `mongodb.js` service
5. Check browser console for any connection errors
