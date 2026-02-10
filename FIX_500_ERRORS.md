# Fixing 500 Errors - Complete Guide

## Issues Fixed

### 1. ✅ Auth Middleware Import Error
**Problem:** `auth` middleware was being imported as default instead of destructured
```javascript
// WRONG
const auth = require('../middleware/auth');

// CORRECT
const { auth } = require('../middleware/auth');
```

**Files Fixed:**
- `server/routes/report.js`

### 2. ✅ User ID Reference Error
**Problem:** Auth middleware sets `req.userId` but code was using `req.user.id`
```javascript
// WRONG
const user = await User.findById(req.user.id);

// CORRECT
const user = await User.findById(req.userId);
```

**Files Fixed:**
- `server/routes/report.js` (all 6 endpoints)

## Common 500 Errors & Solutions

### Error: "Cannot read property 'findById' of null"
**Cause:** MongoDB not connected or User model not imported correctly
**Solution:**
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env` file
3. Verify `User` model is imported: `const User = require('../models/User');`

### Error: "Route.get() requires a callback function but got a [object Object]"
**Cause:** Middleware imported incorrectly
**Solution:**
Use destructuring: `const { auth } = require('../middleware/auth');`

### Error: "Cannot read property 'comparePassword' of null"
**Cause:** User not found in database during login
**Solution:**
1. Register a new user first
2. Check email spelling
3. Verify email exists in MongoDB

### Error: "No authentication token provided"
**Cause:** Frontend not sending JWT token in Authorization header
**Solution:**
1. Save token after login: `localStorage.setItem('token', token)`
2. Send with requests: `headers: { 'Authorization': 'Bearer ' + token }`
3. Check browser DevTools Network tab - verify Authorization header exists

## Server Error Checking

### Check Server Logs
Run server and watch for errors:
```bash
npm run server
```

Look for:
- MongoDB connection status
- Route registration confirmation
- Any error stack traces

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{ "message": "Server is running" }
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Expected response (if user exists):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "fullName": "...",
    "email": "...",
    "role": "student"
  }
}
```

## Frontend Error Checking

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

### Check API Response
In Network tab:
1. Click on failed request
2. Go to Response tab
3. See the error message from server

### Common Frontend Issues

**"Proxy error: Could not proxy request"**
- Backend not running
- Backend running on wrong port
- Solution: Start backend on 5000

**"Failed to load resource: 500 Internal Server Error"**
- Backend error (check server logs)
- Wrong endpoint path
- Missing authentication token

**"Failed to login"**
1. Check user exists in MongoDB
2. Verify email/password format
3. Check token is being saved

## MongoDB Connection Issues

### Check MongoDB Connection
```bash
# Windows - Check if MongoDB service is running
Get-Service MongoDB

# Start MongoDB if not running
Start-Service MongoDB
```

### Check Local MongoDB
```bash
# Connect to local MongoDB
mongosh localhost:27017/skill2success
```

### Check MongoDB Atlas Connection
1. Verify connection string in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill2success
   ```
2. Whitelist IP in MongoDB Atlas
3. Check network connectivity

## Database Initialization

### Ensure Career Profiles Exist
The `/api/report/generate` endpoint needs career profiles in database.

**Add sample careers:**
1. Go to MongoDB Atlas or local MongoDB
2. Insert documents in `careerprofiles` collection

Example career profile:
```json
{
  "jobRole": "Full Stack Developer",
  "description": "Build complete web applications",
  "requiredSkills": {
    "programming": ["JavaScript", "Python"],
    "databases": ["MongoDB", "SQL"],
    "frameworks": ["React", "Node.js"],
    "tools": ["Git", "Docker"]
  },
  "softSkills": ["Communication", "Problem-solving"],
  "avgSalary": "₹6-15 LPA",
  "jobMarketDemand": "High",
  "learningPath": ["Web Dev Bootcamp", "System Design"],
  "companies": ["Google", "Amazon", "Microsoft"]
}
```

### Ensure Exams Exist
For `/api/report/exams` endpoint:
```json
{
  "examName": "GATE",
  "examType": "Entrance",
  "eligibility": "B.Tech",
  "examDate": "2024-02-20",
  "syllabus": ["Data Structures", "Algorithms"],
  "difficulty": "Hard"
}
```

## Error Handler Improvements

Enhanced error handling added to:
- `server/server.js` - Global error handler
- Request logging middleware
- 404 not found handler

All errors now logged with:
- Request method and path
- Full error details
- Proper HTTP status codes

## Quick Diagnostic Checklist

- [ ] MongoDB running?
- [ ] `.env` file configured?
- [ ] Backend running on 5000?
- [ ] Frontend running on 3000?
- [ ] Auth middleware imports correct?
- [ ] `req.userId` used (not `req.user.id`)?
- [ ] Token saved in localStorage after login?
- [ ] Token sent in Authorization header?
- [ ] Career profiles in database?
- [ ] Check browser console for errors?
- [ ] Check server logs for errors?

## Debug Mode

Set environment variable:
```bash
set NODE_ENV=development
npm run server
```

This will show full error messages in API responses.

## Still Getting Errors?

1. **Restart everything:**
   ```bash
   # Kill all Node processes
   taskkill /F /IM node.exe
   
   # Restart backend
   npm run server
   ```

2. **Check file paths:**
   - All imports use correct paths
   - Files exist in specified locations

3. **Check MongoDB:**
   ```bash
   # Verify collections exist
   mongosh localhost:27017/skill2success
   > db.users.countDocuments()
   > db.careerprofiles.countDocuments()
   ```

4. **Check package.json:**
   - All dependencies installed
   - Scripts configured correctly

5. **Post error details:**
   - Full error message from console
   - Endpoint being called
   - Request body being sent
   - Response from server
