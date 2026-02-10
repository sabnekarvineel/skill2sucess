# Fix Port Conflicts & Restart Servers

## What Happened

```
[0] [nodemon] app crashed - waiting for file changes before starting...
[1] Something is already running on port 3000.
[1] npm run client exited with code 0
```

**Diagnosis:**
- Port 3000 (frontend) was occupied by previous process
- Backend crashed trying to start (likely MongoDB connection issue)
- Both processes need clean restart

---

## ✅ Fix Already Applied

```bash
✓ Killed process 18904 on port 3000
✓ Verified MongoDB is running (PID 5748)
✓ Verified port 5000 is free
```

---

## How to Restart Properly (Choose One Method)

### Method 1: Simple Restart (Fastest) ⭐

**Double-click this file:**
```
START_FRESH.bat
```

This will:
1. Kill any existing node processes
2. Install dependencies if needed
3. Start backend on port 5000
4. Start frontend on port 3000
5. Show URLs to visit

---

### Method 2: Manual Restart

**Open 2 Terminal Windows:**

**Terminal 1 - Backend:**
```bash
cd c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess
npm run server
```

Expected output:
```
> npm run server
> nodemon server/server.js

Connecting to MongoDB...
Database: Local MongoDB
✅ MongoDB connected successfully
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess\client
npm start
```

Expected output:
```
> npm start

On Your Network: http://192.168.x.x:3000

Local: http://localhost:3000
```

---

### Method 3: Start Both Together

```bash
cd c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess
npm run dev
```

This uses `concurrently` to run both servers in one terminal.

---

## Verify Everything Works

### 1. Check Backend Health
```
Browser: http://localhost:5000/api/health
Expected: {"message":"Server is running"}
```

### 2. Check Frontend
```
Browser: http://localhost:3000
Expected: Login/Register page
```

### 3. Check Logs

**Backend Console Should Show:**
```
Connecting to MongoDB...
Database: Local MongoDB
✅ MongoDB connected successfully
Server running on port 5000
```

**Frontend Console Should Show:**
```
Webpack compiled successfully
On Your Network: http://192.168.1.x:3000
Local: http://localhost:3000
```

---

## If Still Having Issues

### Issue: Backend Still Crashes

**Check MongoDB Connection:**
```bash
# Verify MongoDB is running
tasklist | findstr mongod
```

If not running, start it:
```bash
# In new terminal
mongod
```

**Check .env File:**
```bash
# Verify .env exists and has variables
type .env
```

Should contain:
```
MONGODB_URI=mongodb://localhost:27017/skill2success
JWT_SECRET=skill2success_secret_key
PORT=5000
```

**Reinstall Dependencies:**
```bash
npm install
```

---

### Issue: Port Already in Use

**Find what's using the port:**
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Find process on port 5000
netstat -ano | findstr :5000
```

**Kill the process:**
```bash
taskkill /PID <PID_NUMBER> /F
```

---

### Issue: Dependencies Missing

```bash
# Reinstall everything
npm cache clean --force
npm install

cd client
npm install
cd ..
```

---

## Complete Clean Restart (Nuclear Option)

If everything fails:

```bash
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Wait
timeout /t 3

# 3. Clean cache
npm cache clean --force

# 4. Remove node_modules
rmdir /s /q node_modules
rmdir /s /q client\node_modules

# 5. Reinstall everything
npm install
cd client && npm install && cd ..

# 6. Start fresh
npm run dev
```

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run server` | Start backend only |
| `npm start` (in client/) | Start frontend only |
| `npm run dev` | Start both together |
| `npm install` | Install dependencies |
| `npm cache clean --force` | Clear npm cache |
| `taskkill /F /IM node.exe` | Kill all node processes |

---

## Folder Structure

```
skill2sucess/
├── server/
│   ├── server.js          (Main backend file)
│   ├── routes/            (API endpoints)
│   ├── models/            (Database schemas)
│   ├── middleware/        (Auth middleware)
│   └── utils/             (Utilities - including reportGenerator.js)
├── client/
│   ├── src/
│   │   ├── pages/         (React pages - including CareerReport.js)
│   │   ├── styles/        (CSS - including CareerReport.css)
│   │   └── App.js         (Main React component)
│   └── package.json
├── .env                   (Environment variables)
├── package.json           (Root dependencies)
└── START_FRESH.bat        (Quick start script)
```

---

## Ports Used

- **Backend**: Port 5000
  - Health check: `http://localhost:5000/api/health`
  - API base: `http://localhost:5000/api/`

- **Frontend**: Port 3000
  - App: `http://localhost:3000`
  - Browser will auto-open

- **MongoDB**: Port 27017 (local)
  - or MongoDB Atlas (cloud)

---

## After Restart

Once servers are running:

### Test the Report Feature

1. Register new account at `http://localhost:3000`
2. Login
3. Go to Skills section
4. Add some skills:
   - Programming: JavaScript, Python
   - Databases: MongoDB
   - Frameworks: React
   - Tools: Git
5. Save skills
6. Navigate to Career Report (`/report`)
7. Report should generate with 6 tabs

### Verify All Features Work

- [ ] Frontend loads
- [ ] Backend API responds
- [ ] MongoDB connected
- [ ] Can register/login
- [ ] Skills form works
- [ ] Career report generates
- [ ] All 6 tabs functional
- [ ] Download works

---

## Need Help?

**Check these files:**
- `FIX_PORT_ERROR.md` - Detailed port troubleshooting
- `README.md` - Project overview
- `START_REPORT_HERE.md` - Report feature guide
- `TROUBLESHOOTING.md` - General troubleshooting

---

## Quick Start Summary

```bash
# Step 1: Change to project directory
cd "c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess"

# Step 2: Kill existing processes (already done)
taskkill /F /IM node.exe

# Step 3: Start servers
npm run dev

# Step 4: Wait for both to start
# Backend: "Server running on port 5000"
# Frontend: "On Your Network: http://..."

# Step 5: Open browser
# Navigate to: http://localhost:3000
```

---

**You're ready to go! 🚀**

Choose your startup method above and let's get rolling!
