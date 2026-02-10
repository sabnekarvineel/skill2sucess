# Fix Port Conflicts - Quick Guide

## Error: "Something is already running on port 3000"

### Solution 1: Kill the Process Using Port 3000 (Already Done ✅)

```bash
# Windows - Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Status**: ✅ Done - Process 18904 terminated

---

## Error: "[nodemon] app crashed - waiting for file changes"

This means the backend server is failing to start. Common causes:

### 1. MongoDB Connection Issue

**Check MongoDB Status:**
```bash
# Verify MongoDB is running
tasklist | findstr mongod
```

**If not running:**
- Windows: Start MongoDB from Services or command line: `mongod`
- Or use MongoDB Atlas cloud database

### 2. Missing Environment Variables

**Check .env file exists:**
```bash
dir .env
```

**Required variables:**
```
MONGODB_URI=mongodb://localhost:27017/skill2success
JWT_SECRET=skill2success_secret_key
PORT=5000
```

### 3. Missing Dependencies

**Reinstall dependencies:**
```bash
npm install
```

---

## How to Start Properly

### Step 1: Kill All Existing Processes

```bash
# Kill port 3000 (frontend)
taskkill /PID 18904 /F

# Kill port 5000 (backend) if running
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Step 2: Verify MongoDB Connection

```bash
# Check if MongoDB is running
tasklist | findstr mongod

# If not, start it
mongod
```

### Step 3: Start Fresh

```bash
# From root directory
cd "c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess"

# Start backend in new terminal
npm run server

# OR start both together
npm run dev
```

### Step 4: In Separate Terminal, Start Frontend

```bash
cd client
npm start
```

---

## Quick Restart Script

Create `start.bat` in root:

```batch
@echo off
echo Killing existing processes...
taskkill /F /IM node.exe 2>nul

echo Waiting 2 seconds...
timeout /t 2 /nobreak

echo Starting backend...
start cmd /k "npm run server"

timeout /t 3 /nobreak

echo Starting frontend...
start cmd /k "cd client && npm start"

echo Both servers starting...
```

Run: `start.bat`

---

## Verify Everything Works

### 1. Check Backend (Port 5000)
```
http://localhost:5000/api/health
```
Should return: `{"message":"Server is running"}`

### 2. Check Frontend (Port 3000)
```
http://localhost:3000
```
Should show login/dashboard page

### 3. Check MongoDB Connection
In backend console should show:
```
✅ MongoDB connected successfully
```

---

## If Problems Persist

### Completely Clean Restart

```bash
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall dependencies
cd "c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess"
npm install

cd client
npm install
cd ..

# 4. Start fresh
npm run dev
```

### Check Logs

**Backend logs:**
- Look for "MongoDB connected"
- Look for port 5000 message
- Check for any error messages

**Frontend logs:**
- Check browser console (F12)
- Check terminal output

---

## Environment Check

### MongoDB Status
```bash
# Check if service is running
sc query MongoDB

# Or manually:
tasklist | findstr mongod
```

### Node & npm Versions
```bash
node --version
npm --version
```

Expected: Node v22.20.0 (you have this ✓)

### Dependencies Installed
```bash
npm list mongoose
npm list express
```

All should be present.

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Port 3000 in use | Previous process still running | `taskkill /PID <PID> /F` |
| MongoDB connection failed | DB not running | Start MongoDB |
| Cannot find module | Dependencies missing | `npm install` |
| EADDRINUSE | Port already taken | Kill process on port |
| CORS error | Frontend/backend mismatch | Check proxy in package.json |

---

## Next Steps

1. **Verify MongoDB is running** (critical)
2. **Kill any existing node processes**
3. **Run `npm run dev`** from root directory
4. **Wait for both servers to start**
5. **Test at localhost:3000 and localhost:5000/api/health**

---

## Getting Help

If still having issues:

1. Take screenshot of error messages
2. Check browser console (F12)
3. Check terminal output
4. Run `npm run server` alone to see backend errors
5. Run `npm start` alone in client folder to see frontend errors

---

**Status**: Ready to restart ✅

Let's get it running! 🚀
