# MongoDB Atlas - Complete Setup & Verification Guide

## 📋 Overview

Your Skill2Success application is now fully configured to work with **MongoDB Atlas**. This guide will walk you through the complete setup process.

---

## 🎯 Setup Checklist

### Pre-Setup
- [ ] MongoDB Atlas account created (free tier is fine)
- [ ] Cluster created
- [ ] Connection string copied

### Configuration
- [ ] `.env` file updated with MONGODB_URI
- [ ] IP whitelisted in MongoDB Atlas
- [ ] Database user created with correct privileges

### Verification
- [ ] Server connects to MongoDB Atlas
- [ ] Can create users
- [ ] Can store and retrieve data
- [ ] Dashboard recommendations work

---

## 📖 Complete Setup Guide

### Phase 1: MongoDB Atlas Setup (5 minutes)

#### Step 1.1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create organization and project

#### Step 1.2: Create a Cluster
1. Click **"Create a Cluster"**
2. Choose **"Shared Clusters"** (Free tier)
3. Select region closest to you
4. Click **"Create Cluster"**
5. Wait for cluster to initialize (2-5 minutes)

#### Step 1.3: Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Fill in:
   - **Username**: e.g., `skill2success_user`
   - **Password**: Create strong password (store safely!)
   - **Built-in Role**: `Read and write to any database`
4. Click **"Add User"**

#### Step 1.4: Whitelist Your IP
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Choose:
   - **Option A (Recommended for Development)**: Add your current IP
     - Click **"Add Current IP Address"**
   - **Option B (Easy but Less Secure)**: Allow all IPs
     - Enter `0.0.0.0/0`
4. Click **"Confirm"**

#### Step 1.5: Get Connection String
1. Go to **"Clusters"** page
2. Click **"Connect"** button
3. Click **"Connect your application"**
4. Choose **"Node.js"** and version **"3.6 or later"**
5. Copy the connection string (starts with `mongodb+srv://`)

**Example connection string:**
```
mongodb+srv://skill2success_user:mypassword@cluster0.abcde.mongodb.net/skill2success?retryWrites=true&w=majority
```

---

### Phase 2: Application Configuration (3 minutes)

#### Step 2.1: Update .env File

Open the `.env` file in your project and add:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/skill2success?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development
```

**Replace these values:**
1. `username` → Your MongoDB Atlas username (from Step 1.3)
2. `password` → Your MongoDB Atlas password
3. `cluster-name` → Your cluster name (e.g., cluster0)

#### Step 2.2: Handle Special Characters

If your password contains special characters:
1. URL encode them at [URLEncoder.org](https://www.urlencoder.org/)
2. Or create a new password without special characters

**Example:**
- Password: `My@Pass!123`
- Encoded: `My%40Pass%21123`
- Connection String: 
  ```
  mongodb+srv://user:My%40Pass%21123@cluster0.abc.mongodb.net/skill2success?...
  ```

---

### Phase 3: Verification (5 minutes)

#### Step 3.1: Verify Server Connection

Run your application:
```bash
npm run dev
```

**Expected output:**
```
Connecting to MongoDB...
Database: MongoDB Atlas
✅ MongoDB connected successfully
Database Type: MongoDB Atlas
Client running on port 3000
Server running on port 5000
```

#### Step 3.2: Test API Health

Open browser and visit:
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{"message": "Server is running"}
```

#### Step 3.3: Test Complete Flow

1. Go to `http://localhost:3000`
2. Register a new account
   ```
   Email: test@example.com
   Password: TestPass123
   Name: Test User
   Degree: B.Tech CSE
   Semester: 4
   CGPA: 8.5
   ```
3. Login with credentials
4. Click **"My Skills"**
5. Add some skills:
   - Programming: JavaScript, Python
   - Frameworks: React, Django
   - Tools: Git, Docker
6. Save

#### Step 3.4: Verify Data in MongoDB Atlas

1. Go to [MongoDB Atlas Dashboard](https://account.mongodb.com/account/login)
2. Click your cluster
3. Click **"Browse Collections"**
4. You should see:
   - Database: `skill2success`
   - Collection: `users`
   - Your user document with all details!

**Example User Document:**
```json
{
  "_id": ObjectId("..."),
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "$2a$10$...",
  "degree": "B.Tech CSE",
  "semester": 4,
  "cgpa": 8.5,
  "skills": {
    "programming": ["JavaScript", "Python"],
    "frameworks": ["React", "Django"],
    "tools": ["Git", "Docker"],
    "databases": [],
    "softSkills": [],
    "other": []
  },
  "interests": [],
  "hobbies": [],
  "registeredAt": ISODate("2025-02-09T..."),
  "updatedAt": ISODate("2025-02-09T...")
}
```

#### Step 3.5: Test Dashboard

1. Click **"My Profile"**
2. Should see your data displayed beautifully
3. Should see career recommendations
4. Check skill gaps and resources

---

## 🐛 Troubleshooting

### Problem 1: Connection Timeout

**Error Message:**
```
MongooseError: connection timed out after 10000ms
```

**Solutions:**
1. Check if cluster is running (not paused):
   - Go to MongoDB Atlas → Clusters
   - If paused, click "Resume"

2. Verify IP is whitelisted:
   - Go to Network Access
   - Check if your IP is listed
   - If not, add it

3. Check internet connection

4. Verify MONGODB_URI in .env is correct

### Problem 2: Authentication Failed

**Error Message:**
```
MongoError: authentication failed
```

**Solutions:**
1. Verify username and password:
   - Double-check spelling
   - Copy password from MongoDB Atlas if unsure

2. URL encode special characters:
   ```
   @ becomes %40
   ! becomes %21
   # becomes %23
   $ becomes %24
   ```

3. Verify user exists in MongoDB Atlas:
   - Go to Database Access
   - Check if user is listed
   - If not, create new user

### Problem 3: Invalid Connection String

**Error Message:**
```
Invalid connection string
```

**Solutions:**
1. Verify format:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/database-name?...
   ```

2. Check for:
   - No spaces in string
   - `mongodb+srv://` at start
   - Correct username and password
   - Correct cluster name
   - Database name at end

3. Copy directly from MongoDB Atlas:
   - Go to Clusters → Connect → "Connect your application"
   - Copy the entire string
   - Replace username and password

### Problem 4: Can't Write Data

**Error Message:**
```
MongoError: write concern failed with status 50 and error message 'cannot create index over {_id_: "hashed"} over the collection
```

**Solutions:**
1. Ensure user has "Read and write to any database" role
2. Check MongoDB Atlas has no alerts
3. Try creating new test user
4. Check database storage isn't full (unlikely on free tier)

---

## 📊 Monitoring & Management

### View Your Data

1. **Browse Collections:**
   - Go to MongoDB Atlas → Your Cluster
   - Click "Browse Collections"
   - View all data in real-time

2. **Search Data:**
   - Click on collection
   - Use filter syntax: `{email: "test@example.com"}`
   - Find specific records

3. **Edit Data:**
   - Click on document
   - Click "Edit"
   - Modify fields
   - Save changes

### Monitor Performance

1. **Check Metrics:**
   - Go to Metrics tab
   - View:
     - Network I/O
     - Operations per second
     - Connection count
     - Storage usage

2. **View Logs:**
   - Go to Activity Feed
   - See all connection attempts
   - Check for errors

---

## 🔒 Security Best Practices

### 1. Password Management
```
✅ Use strong, unique passwords
✅ Store in .env file
✅ Change periodically
❌ Don't use simple passwords
❌ Don't commit .env to git
```

### 2. IP Whitelisting
```
Development:
✅ Add your IP
✅ Add server IP if hosted

Production:
✅ Add specific server IPs
❌ Don't use 0.0.0.0/0
```

### 3. Database Users
```
Development:
✅ One user for development

Production:
✅ Separate user for production
✅ Different password
✅ Limited privileges if possible
```

### 4. Git Configuration
```
.gitignore should include:
.env
.env.local
.env.*.local
```

---

## 📈 Production Deployment

When deploying to production:

### Step 1: Create Production Cluster
1. Create separate cluster for production (if needed)
2. Or use same cluster with separate database

### Step 2: Create Production User
1. Go to Database Access
2. Create new user for production
3. Use strong, unique password
4. Store securely in production environment

### Step 3: Whitelist Production IPs
1. Note your server's public IP
2. Add to Network Access (or IP range)
3. Never use 0.0.0.0/0 in production

### Step 4: Set Environment Variables
On your production server:
```bash
export MONGODB_URI="mongodb+srv://prod_user:prod_password@cluster0.xxx.mongodb.net/skill2success?retryWrites=true&w=majority"
export NODE_ENV="production"
export PORT="5000"
```

### Step 5: Enable Backups
1. Go to Backup section
2. Enable automatic backups
3. Set retention policy

---

## 🚀 Database Collections

Your MongoDB Atlas will automatically create these collections:

### Users Collection
```
Collection: users
Fields:
- _id (ObjectId)
- fullName (String)
- email (String, unique)
- password (String, hashed)
- degree (String)
- semester (Number)
- cgpa (Number)
- skills (Object)
- interests (Array)
- hobbies (Array)
- careerRecommendations (Object)
- registeredAt (Date)
- updatedAt (Date)
```

### Career Profiles Collection
```
Collection: careerprofiles
(Created by admin/seeding)
```

### Exams Collection
```
Collection: exams
(Created by admin/seeding)
```

---

## ✅ Final Checklist

Before going live:

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string in .env
- [ ] Server connects successfully
- [ ] Can register users
- [ ] Can login
- [ ] Can add skills
- [ ] Can view dashboard
- [ ] Data appears in MongoDB Atlas
- [ ] .env is in .gitignore
- [ ] No secrets in code

---

## 📞 Getting Help

### Common Resources
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Connection String Reference](https://docs.mongodb.com/manual/reference/connection-string/)
- [MongoDB University - Free Courses](https://university.mongodb.com/)

### Testing Your Connection

If you want to test connection before running full app:

```bash
# Create test-connection.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas!'))
.catch(err => console.error('❌ Connection failed:', err.message));
```

Then run:
```bash
node test-connection.js
```

---

## 🎉 You're All Set!

Your application is fully configured for MongoDB Atlas.

### Next Steps:
1. Ensure MONGODB_URI is set in .env
2. Run `npm run dev`
3. Register and test the application
4. Check MongoDB Atlas to verify data storage

---

**Last Updated:** February 9, 2025
**Status:** Ready for MongoDB Atlas
**Version:** 1.0
