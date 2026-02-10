# Skill2Success - Quick Start Guide

## Prerequisites Installation

### 1. Install Node.js
- Download from https://nodejs.org/
- Install v16 or higher
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install MongoDB
**Option A: Local Installation**
- Download from https://www.mongodb.com/try/download/community
- Follow installation steps for your OS
- Start MongoDB:
  - Windows: MongoDB runs as a service by default
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Update `.env` with your MongoDB URI

## Step-by-Step Setup

### Step 1: Clone/Download Project
```bash
cd c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

### Step 3: Setup Environment Variables
Create `.env` file in root directory:
```
MONGODB_URI=mongodb://localhost:27017/skill2success
JWT_SECRET=skill2success_secret_key
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill2success?retryWrites=true&w=majority
JWT_SECRET=skill2success_secret_key
PORT=5000
```

### Step 4: Seed Sample Data (Optional)
```bash
node server/seeds/seedData.js
```

This adds sample career profiles and exams to your database.

### Step 5: Start Backend Server
```bash
npm run server
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Step 6: Install Frontend Dependencies
In a new terminal/command prompt:
```bash
cd client
npm install
```

### Step 7: Start Frontend Server
```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## Quick Start (Both Servers)

From the root directory, run:
```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) simultaneously.

## Default Test Account

After seeding data, you can create a test account:

**Register as:**
- Full Name: John Doe
- Email: john@example.com
- Password: password123
- Degree: B.Tech CSE
- Semester: 4
- CGPA: 8.5

## Project Directory Structure

```
skill2sucess/
├── server/                 # Backend code
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication
│   ├── seeds/             # Sample data
│   └── server.js          # Server entry point
├── client/                # Frontend code
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app
│   │   └── index.css      # Global styles
│   └── package.json
├── .env                   # Environment variables
├── package.json           # Root dependencies
└── README.md             # Full documentation
```

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Ensure MongoDB is running
- Check if port 27017 is accessible
- For MongoDB Atlas, verify IP whitelist and connection string

### Issue: Port 3000 or 5000 Already in Use
**Solution - Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual ID)
taskkill /PID <PID> /F
```

**Solution - Mac/Linux:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: CORS Error
**Solution:**
- Ensure backend is running on port 5000
- Check proxy setting in `client/package.json`
- Verify backend URL in API calls

### Issue: npm install Fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Testing the Application

### Test User Registration
1. Go to http://localhost:3000/register
2. Fill in all details
3. Click "Sign Up"

### Test Skills Section
1. Go to Dashboard (if logged in)
2. Click "My Skills"
3. Add some skills from dropdowns
4. Click "Save Skills & Interests"

### Test Recommendations
1. Go to "Recommendations"
2. View your personalized job roles
3. Check suitability scores and skill gaps

### Test Exams
1. Go to "Exams"
2. Filter by exam type
3. View exam details

## Development Tips

### Hot Reload
- Frontend automatically reloads on code changes
- Backend: Install `nodemon` (already in devDependencies)

### Database Management
- Use MongoDB Compass for GUI database management
- Download from https://www.mongodb.com/products/compass

### API Testing
- Use Postman: https://www.postman.com/
- Import API endpoints for testing

## Building for Production

### Frontend Build
```bash
cd client
npm run build
```

### Production Environment Variables
```
MONGODB_URI=your_production_uri
JWT_SECRET=strong_secret_key
PORT=5000
NODE_ENV=production
```

### Deploy Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, AWS, DigitalOcean, Railway

## Accessing the Application

**Home Page:** http://localhost:3000

**Login Page:** http://localhost:3000/login

**Register Page:** http://localhost:3000/register

**Dashboard:** http://localhost:3000/dashboard (after login)

**API Health Check:** http://localhost:5000/api/health

## Contact & Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review server logs for error messages
3. Check browser console for frontend errors

## Next Steps

1. Create your account and explore the platform
2. Add your skills and interests
3. View personalized recommendations
4. Plan your career path
5. Explore entrance exam information

---

Happy Career Planning! 🎯
