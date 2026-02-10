# Quick Fix Guide - 500 Errors

## What Was Fixed

1. **Auth Middleware Import** - `server/routes/report.js` now correctly imports auth
2. **User ID Reference** - Changed all `req.user.id` to `req.userId` in report routes
3. **Error Handling** - Added global error handler and request logging
4. **Database Seeding** - Created script to populate career profiles and exams

## Get Started in 3 Steps

### Step 1: Seed the Database
```bash
npm run seed
```

This populates MongoDB with:
- 8 career profiles
- 7 entrance exams and certifications

### Step 2: Start Backend
```bash
npm run server
```

You should see:
```
✅ MongoDB connected successfully
Server running on port 5000
```

### Step 3: Start Frontend (in another terminal)
```bash
npm run client
```

Frontend will be at: http://localhost:3000

## Test the Fixes

### 1. Register a User
1. Open http://localhost:3000
2. Click "Register"
3. Fill in the form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test@123
   - Degree: BCA
   - Semester: 4
   - CGPA: 8.5
4. Click Register

### 2. Login
1. Use the credentials just created
2. You should get a token and be logged in

### 3. Generate Report
1. Click "Generate Report" (or navigate to dashboard)
2. You should see the comprehensive career report

## If Still Getting 500 Errors

### Check Server Logs
The backend should now show clear error messages:
```
GET /api/auth/login
POST /api/report/generate
Error details printed below each request
```

### Common Issues

1. **"User not found"** - Register a user first
2. **"No career profiles"** - Run `npm run seed`
3. **"MongoDB connection failed"** - Check .env and MongoDB status
4. **"Cannot read property"** - Check browser console for exact error

### Verify Setup

Run these curl commands:

```bash
# 1. Check server is running
curl http://localhost:5000/api/health

# 2. Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Test",
    "email":"test@test.com",
    "password":"Test123",
    "degree":"BCA",
    "semester":4,
    "cgpa":8.5
  }'

# 3. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123"}'

# 4. Get Report (replace TOKEN with JWT from login)
curl -X GET http://localhost:5000/api/report/generate \
  -H "Authorization: Bearer TOKEN"
```

## Files Modified

✅ `server/routes/report.js` - Fixed auth import and req.userId references
✅ `server/server.js` - Added error handling and logging
✅ `server/routes/auth.js` - Added error logging
✅ `package.json` - Added seed script

## Files Created

✅ `server/config/mongodb.js` - MongoDB connection module
✅ `server/scripts/seedDatabase.js` - Database seeding script
✅ `client/src/api/mongodb.js` - Frontend API service
✅ `client/.env.local` - Frontend environment config
✅ `START_BACKEND.bat` - Backend startup script
✅ `START_FRONTEND.bat` - Frontend startup script
✅ `FIX_500_ERRORS.md` - Detailed troubleshooting guide
✅ `SETUP_SEPARATE_SERVERS.md` - Setup instructions
✅ `QUICK_FIX_GUIDE.md` - This file

## Next Steps

1. ✅ Run `npm run seed` to populate database
2. ✅ Test endpoints with curl or Postman
3. ✅ Check browser console for any remaining errors
4. ✅ Review `FIX_500_ERRORS.md` for detailed troubleshooting

## Success Indicators

- [ ] Backend starts without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Can register a new user
- [ ] Can login with registered credentials
- [ ] Can generate a report without 500 error
- [ ] Report contains career recommendations

## Still Having Issues?

1. **Kill all processes and restart:**
   ```bash
   taskkill /F /IM node.exe
   npm run seed
   npm run server
   ```

2. **Check database:**
   ```bash
   mongosh localhost:27017/skill2success
   > db.careerprofiles.countDocuments()
   > db.exams.countDocuments()
   > db.users.countDocuments()
   ```

3. **Clear MongoDB and reseed:**
   ```bash
   # In MongoDB shell
   > db.dropDatabase()
   # Then run npm run seed
   ```

4. **Check .env file:**
   ```
   MONGODB_URI=mongodb://localhost:27017/skill2success
   PORT=5000
   JWT_SECRET=skill2success_secret_key
   ```
