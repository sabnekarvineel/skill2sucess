# First Run - Complete Instructions

## Before You Start ✅

### Prerequisites Checklist
- [ ] Node.js installed (v14+)? → https://nodejs.org
- [ ] MongoDB running or Atlas account? → https://mongodb.com
- [ ] Project downloaded/cloned?
- [ ] Terminal/Command Prompt ready?

---

## Step 1: Open Project Folder

**Windows:**
1. Open Command Prompt or PowerShell
2. Navigate to:
   ```
   C:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess
   ```

**Mac/Linux:**
1. Open Terminal
2. Navigate to project folder

---

## Step 2: Verify Node.js & npm

```bash
node --version
npm --version
```

Should show version numbers like `v16.0.0` and `8.0.0`

If error: Install Node.js from https://nodejs.org

---

## Step 3: Install Backend Dependencies

```bash
npm install
```

**Wait for it to complete** (shows "added X packages")

---

## Step 4: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

**Wait for it to complete**

---

## Step 5: Setup MongoDB

### Option A: MongoDB Atlas (Recommended for Beginners)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account (use Google or Email)
4. Create a free cluster
5. Get connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
6. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill2success?retryWrites=true&w=majority
   ```
   - Replace `username` and `password` with your Atlas credentials

### Option B: Local MongoDB

1. Install from https://www.mongodb.com/try/download/community
2. Start MongoDB service (Windows: Services, Mac: `brew services start mongodb-community`)
3. Keep `.env` as is (already points to localhost)

---

## Step 6: Verify .env File

Check file `c:\Users\Sabnekar Vineel\OneDrive\Desktop\skill2sucess\.env`:

```env
MONGODB_URI=mongodb://localhost:27017/skill2success
JWT_SECRET=skill2success_secret_key
PORT=5000
```

✅ If using Atlas, update `MONGODB_URI` only

---

## Step 7: Run the Application

**Easy Way - Windows:**
Double-click `RUN.bat` in project folder

**Easy Way - Mac/Linux:**
Run in terminal:
```bash
npm run dev
```

**Manual Way:**
In project root folder:
```bash
npm run dev
```

---

## Step 8: Wait for Startup

You should see in terminal:
```
Server running on port 5000
MongoDB connected
Compiled successfully!
```

Browser should open automatically at `http://localhost:3000`

If not, **manually open** http://localhost:3000

---

## Step 9: Create Your First Account

1. Click **"Sign Up"** button
2. Fill in form:
   - **Full Name:** Your Name
   - **Email:** yourname@example.com
   - **Password:** password123
   - **Degree:** B.Tech CSE (or your degree)
   - **Semester:** 4 (or your semester)
   - **CGPA:** 8.5 (or your CGPA)
3. Click **"Sign Up"**
4. You'll be logged in to dashboard

---

## Step 10: Add Your Skills

1. Click **"My Skills"** in navigation
2. Add some skills:
   - Select "JavaScript" from Programming Languages dropdown
   - Click "Add"
   - Repeat for more skills
3. Click **"Save Skills & Interests"**
4. Success message appears!

---

## Step 11: View Recommendations

1. Click **"Recommendations"** in navigation
2. See jobs sorted by match score
3. Each card shows:
   - Suitability score
   - Matching skills ✓
   - Missing skills ✗
   - Tips for improvement

---

## Step 12: Explore Exams

1. Click **"Exams"** in navigation
2. See entrance exams (GATE, NIMCET, CUET)
3. Filter by exam type
4. View exam details, dates, resources

---

## 🎉 Success!

If you see all pages loading, you're done! ✅

### What's Working:
- ✅ User registration
- ✅ Database connection
- ✅ Skill management
- ✅ Career recommendations
- ✅ Exam information
- ✅ Full application

---

## To Stop the Application

Press `Ctrl + C` in terminal

Both servers will stop.

---

## To Run Again Later

Just run:
```bash
npm run dev
```

or double-click `RUN.bat`

---

## Common Issues at This Stage

### "Cannot find module 'express'"
```bash
npm install
```

### "MongoDB connection failed"
- Check MongoDB is running
- Verify `.env` has correct URI
- Check internet (if using Atlas)

### "Port 3000 already in use"
- Close other apps
- Or update PORT in `.env`

### "Blank page at localhost:3000"
- Wait 30 seconds first time
- Check browser console (F12)
- Restart servers

See **TROUBLESHOOTING.md** for more issues

---

## Next Steps

### Try These Features:
1. ✅ Register another test account
2. ✅ Add different skills
3. ✅ Check recommendations
4. ✅ See skill gaps
5. ✅ Explore exams
6. ✅ View dashboard

### Customize:
1. Change colors in CSS files
2. Add more career profiles
3. Add more exams
4. Modify form fields
5. Create admin account

### Learn:
1. Read README.md
2. Study ARCHITECTURE.md
3. Review API endpoints in QUICK_REFERENCE.md
4. Explore code structure

---

## Important Folders

| Folder | Purpose |
|--------|---------|
| `/server` | Backend code |
| `/client/src` | Frontend code |
| `/client/src/pages` | Page components |
| `/client/src/components` | Reusable components |

---

## Important Files

| File | Purpose |
|------|---------|
| `.env` | Configuration |
| `server/server.js` | Backend entry point |
| `client/src/App.js` | Frontend entry point |
| `client/src/index.css` | Global styles |

---

## Need Help?

📖 **Read:**
- START_HERE.md
- INSTALL_FIRST.md
- SETUP_GUIDE.md
- TROUBLESHOOTING.md
- README.md

💻 **Check:**
- Browser console (F12)
- Terminal output
- .env file
- MongoDB connection

---

## Checklist for First Success

- [ ] Node.js installed
- [ ] npm install ran successfully
- [ ] MongoDB running or Atlas connected
- [ ] .env file created
- [ ] npm run dev works
- [ ] Localhost:3000 opens
- [ ] Can create account
- [ ] Can add skills
- [ ] Can see recommendations
- [ ] No console errors

---

## Congratulations! 🎊

You've successfully set up **Skill2Success**!

**Map your skills. Plan your future.** 🎯

---

### Version Info
- Created: February 9, 2026
- Status: Production Ready
- Node Version: 14+ required
- Database: MongoDB required

### Support
All documentation included in project folder. Happy coding! 💻
