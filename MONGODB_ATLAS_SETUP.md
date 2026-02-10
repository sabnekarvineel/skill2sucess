# MongoDB Atlas Setup Guide

## ✅ MongoDB Atlas Configuration

Your application is now configured to work with **MongoDB Atlas**. Follow this guide to set it up correctly.

---

## 📋 Prerequisites

- MongoDB Atlas account (free tier available)
- Your cluster created and connection string ready
- Node.js installed locally for development

---

## 🔧 Step-by-Step Setup

### Step 1: Get Your MongoDB Atlas Connection String

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
   ```

### Step 2: Update Your .env File

Add/Update your `.MONGODB_URI` in the `.env` file:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/skill2success?retryWrites=true&w=majority

# Other Configuration
PORT=5000
NODE_ENV=development
```

**Replace:**
- `username` → Your MongoDB Atlas username
- `password` → Your MongoDB Atlas password
- `cluster-name` → Your cluster name (e.g., cluster0)

### Step 3: Important Notes About Connection String

⚠️ **Password Special Characters:**
If your password contains special characters (@, #, !, $, etc.):
1. URL encode them using [MongoDB Connection String Escaper](https://www.urlencoder.org/)
2. Or create a new password without special characters in MongoDB Atlas

✅ **IP Whitelist:**
Make sure your IP is whitelisted in MongoDB Atlas:
1. Go to **Network Access** → **IP Whitelist**
2. Add your computer's IP or `0.0.0.0/0` (allows all IPs - for development only)

---

## 🚀 Verification Steps

### Step 1: Check Connection in Console

Run your application:
```bash
npm run dev
```

You should see:
```
Connecting to MongoDB...
Database: MongoDB Atlas
✅ MongoDB connected successfully
Database Type: MongoDB Atlas
Server running on port 5000
```

### Step 2: Test Connection with API Call

Open browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{"message": "Server is running"}
```

### Step 3: Test Full Application

1. Go to `http://localhost:3000`
2. Register a new account
3. Add some skills
4. Check MongoDB Atlas dashboard to see data

### Step 4: Verify Data in MongoDB Atlas

1. Go to MongoDB Atlas
2. Click **"Browse Collections"**
3. You should see:
   - Database: `skill2success`
   - Collections: `users`, `careerprofiles`, `exams`, etc.
   - Your data stored there

---

## 📊 Database Structure

Your MongoDB Atlas database will have:

```
skill2success (Database)
├── users (Collection)
│   ├── _id
│   ├── fullName
│   ├── email
│   ├── password
│   ├── degree
│   ├── semester
│   ├── cgpa
│   ├── skills {}
│   ├── interests []
│   ├── hobbies []
│   └── careerRecommendations {}
│
├── careerprofiles (Collection)
├── exams (Collection)
└── (other collections)
```

---

## 🔒 Security Best Practices

### 1. Use Environment Variables
✅ ALWAYS store sensitive data in `.env`
✅ NEVER commit `.env` to git

### 2. Strong Passwords
✅ Use strong, unique passwords for MongoDB Atlas
✅ Store them in `.env` file

### 3. IP Whitelist
✅ Add only necessary IPs
⚠️ Don't use `0.0.0.0/0` in production

### 4. Database Access
✅ Create separate users for development and production
✅ Use different passwords for each

---

## ⚠️ Common Issues & Solutions

### Issue 1: Connection Timeout
**Error:** `MongooseError: connection timeout`

**Solutions:**
1. Check if IP is whitelisted in MongoDB Atlas
2. Verify MONGODB_URI is correct
3. Check internet connection
4. Ensure MongoDB Atlas cluster is running (not paused)

### Issue 2: Authentication Failed
**Error:** `MongoError: Authentication failed`

**Solutions:**
1. Verify username and password are correct
2. Check for special characters - URL encode if needed
3. Make sure user has correct database privileges
4. Verify the user is in the correct project

### Issue 3: Connection String Issues
**Error:** `Invalid connection string`

**Solutions:**
1. Copy the exact string from MongoDB Atlas
2. Replace `<username>` and `<password>`
3. Ensure no extra spaces
4. Check database name is included

### Issue 4: Unable to Write Data
**Error:** `Write failed: E11000 duplicate key error`

**Solutions:**
1. Ensure indexes are not conflicting
2. Clear old data if testing
3. Check field constraints in schema

---

## 📈 Monitoring Your Database

### View Data in MongoDB Atlas

1. Go to **Collections**
2. Select database: `skill2success`
3. Click collection name to view data
4. Search, filter, or export data

### Performance Monitoring

1. Go to **Metrics**
2. Monitor:
   - Network I/O
   - Connections
   - Query patterns
   - Storage usage

---

## 🔄 Backup Strategy

### Automatic Backups (Built into Atlas)
✅ MongoDB Atlas automatically backs up your data
✅ Available in **Backup** section
✅ Free tier: 7-day backup window

### Manual Backups
1. Go to **Backup** section
2. Click **Request a Backup**
3. Download backup when ready

---

## 🚀 Deployment

When deploying to production:

### Step 1: Create Production User
1. In MongoDB Atlas, create new database user
2. Use strong, unique password
3. Limit privileges to necessary databases

### Step 2: Whitelist Production IPs
1. Add your server's IP to Network Access
2. Or allow specific IP ranges

### Step 3: Update .env on Server
```bash
# On your production server
export MONGODB_URI="mongodb+srv://prod_user:prod_password@cluster-name.mongodb.net/skill2success?retryWrites=true&w=majority"
export NODE_ENV="production"
export PORT="5000"
```

### Step 4: Test Connection
```bash
npm run start  # Make sure it connects successfully
```

---

## 📞 MongoDB Atlas Support

### Official Resources
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Connection String Reference](https://docs.mongodb.com/manual/reference/connection-string/)
- [Troubleshooting Guide](https://docs.atlas.mongodb.com/troubleshooting/)

### Common Tasks

**Create Database:**
- Go to Collections → Create Database
- Database name: `skill2success`
- Auto-creates collections as needed

**Create User:**
- Go to Database Access
- Create new user with strong password
- Select "Read and write to any database"

**View Logs:**
- Go to Activity Feed
- See all connection attempts
- Check for errors or issues

---

## ✅ Checklist

Before running the application:

- ✅ MongoDB Atlas account created
- ✅ Cluster created and running
- ✅ Connection string copied
- ✅ `.env` file updated with MONGODB_URI
- ✅ IP whitelisted in MongoDB Atlas
- ✅ User created with correct privileges
- ✅ Database user password set
- ✅ Connection string properly formatted
- ✅ Special characters URL encoded (if any)

---

## 🎉 You're Ready!

Your application is fully configured for MongoDB Atlas.

### Next Steps:
1. Run `npm run dev`
2. Register a user
3. Add skills
4. Check MongoDB Atlas for stored data

---

## 📝 Connection String Template

Use this template to build your connection string:

```
mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER-NAME].mongodb.net/[DATABASE-NAME]?retryWrites=true&w=majority
```

**Parameters:**
- `[USERNAME]` - MongoDB Atlas user
- `[PASSWORD]` - MongoDB Atlas user password (URL encoded)
- `[CLUSTER-NAME]` - Your cluster name
- `[DATABASE-NAME]` - Database name (skill2success)

**Example:**
```
mongodb+srv://john_doe:SecurePass123@cluster0.abcde.mongodb.net/skill2success?retryWrites=true&w=majority
```

---

## 🔗 Useful Links

- [MongoDB Atlas Home](https://www.mongodb.com/cloud/atlas)
- [Connection String URI Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [Network Access](https://docs.atlas.mongodb.com/security/ip-access-list/)
- [Database Users](https://docs.atlas.mongodb.com/security/add-mongodb-users/)

---

**Last Updated:** February 9, 2025
**Status:** Ready for MongoDB Atlas
