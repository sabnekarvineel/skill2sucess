# Skill2Success - Troubleshooting Guide

## Common Issues & Solutions

### 1. ❌ "npm run dev" Command Not Found

**Error:**
```
npm error Missing script: "dev"
```

**Solution:**
```bash
# Install dependencies first
npm install

# Then try again
npm run dev
```

---

### 2. ❌ MongoDB Connection Failed

**Error:**
```
MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes & Solutions:**

**If using Local MongoDB:**
1. Install MongoDB Community
2. Start MongoDB service:
   - Windows: Check Services, start "MongoDB"
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Verify it's running: Port 27017 should be open

**If using MongoDB Atlas (Cloud):**
1. Update `.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill2success?retryWrites=true&w=majority
   ```
2. Replace `username`, `password`, and `cluster` with your info
3. Check internet connection
4. Whitelist your IP in MongoDB Atlas

---

### 3. ❌ Port 3000 or 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE :::3000
```

**Solution:**

**Windows:**
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

**Mac/Linux:**
```bash
# Find process on port 5000
lsof -i :5000

# Kill it
kill -9 <PID>
```

**Alternative:** Change PORT in `.env`:
```
PORT=5001
```

---

### 4. ❌ Blank Page on localhost:3000

**Causes & Solutions:**

1. **React not compiled yet**
   - Wait 30 seconds for first-time build
   - Check console (F12) for errors

2. **Backend not running**
   - Ensure backend server started
   - Check console for "Server running on port 5000"

3. **CORS Error**
   - Check browser console (F12)
   - Backend must run on :5000

4. **Clear cache & refresh**
   - Press Ctrl+Shift+Delete (cache clear)
   - Refresh page Ctrl+R

---

### 5. ❌ npm install Fails

**Error:**
```
npm ERR! 404 Not Found
npm ERR! code E404
```

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

---

### 6. ❌ Module Not Found Errors

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Install dependencies
npm install

# For client
cd client
npm install
cd ..
```

---

### 7. ❌ "concurrently" Command Not Found

**Error:**
```
concurrently is not recognized
```

**Solution:**
```bash
# Install globally
npm install -g concurrently

# Or use npm run dev instead
```

---

### 8. ❌ React App Won't Start

**Error:**
```
Something is already running on port 3000
```

**Solution:**
```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Change port in .env
PORT=3001

# Option 3: Run frontend separately
cd client
npm start
```

---

### 9. ❌ "nodemon" Not Working

**Error:**
```
'nodemon' is not recognized as an internal or external command
```

**Solution:**
```bash
# Install globally
npm install -g nodemon

# Or use npm run server
```

---

### 10. ❌ API Calls Failing (CORS Error)

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**

1. **Check backend is running**
   - Should see "Server running on port 5000"

2. **Check API URL**
   - Frontend calls should go to `http://localhost:5000`
   - Verify in browser Network tab (F12)

3. **Restart both servers**
   - Stop with Ctrl+C
   - Run `npm run dev` again

---

### 11. ❌ Login/Register Not Working

**Error:**
```
User already exists
Network error
```

**Solutions:**

**"User already exists":**
- Register with different email address
- Or clear MongoDB database

**Network error:**
- Check backend is running
- Check network tab in F12
- Verify MongoDB connection

---

### 12. ❌ Skills Not Saving

**Error:**
- Form submits but skills don't appear

**Solutions:**

1. **Check MongoDB connection**
   - See error in backend console

2. **Check network tab (F12)**
   - Look for failed requests
   - Check response status

3. **Verify token**
   - Login again
   - Try adding skills again

---

### 13. ❌ Recommendations Page Blank

**Error:**
- Page loads but shows no recommendations

**Solutions:**

1. **Add skills first**
   - Go to "My Skills"
   - Add at least some skills
   - Save
   - Then go to Recommendations

2. **Check backend logs**
   - Look for errors in terminal

3. **Check database**
   - Career profiles might not be seeded
   - Run: `node server/seeds/seedData.js`

---

### 14. ❌ Database Not Seeding

**Error:**
```
MongoError: could not connect to server
```

**Solution:**

```bash
# Make sure MongoDB is running first
# Then run:
node server/seeds/seedData.js

# If still fails:
# 1. Check MongoDB connection
# 2. Try again
```

---

### 15. ❌ Terminal/Console Issues

**Issue:** Can't see output or error messages

**Solution:**
- Use Command Prompt or PowerShell
- Not Git Bash or WSL (they have display issues)
- Check color output settings

---

## Performance Issues

### Slow Server Response

**Solutions:**
```bash
# Restart servers
# Ctrl+C to stop
# npm run dev to start

# Clear MongoDB cache
# Restart MongoDB service
```

### Slow Page Load

**Solutions:**
1. Check network tab (F12)
2. Look for slow API calls
3. Check MongoDB response time
4. Verify internet speed

---

## Windows Specific Issues

### PowerShell Execution Policy

**Error:**
```
cannot be loaded because running scripts is disabled
```

**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### npm Path Issues

**Error:**
```
npm is not recognized
```

**Solution:**
1. Reinstall Node.js
2. Add to PATH manually
3. Restart Command Prompt

---

## Mac Specific Issues

### Permission Denied

**Error:**
```
Permission denied
```

**Solution:**
```bash
# Run with sudo
sudo npm install

# Or fix permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### MongoDB Not Starting

**Error:**
```
MongoDB service not found
```

**Solution:**
```bash
# Install if needed
brew tap mongodb/brew
brew install mongodb-community

# Start service
brew services start mongodb-community
```

---

## Linux Specific Issues

### Port Permission

**Error:**
```
Error: listen EACCES: permission denied :::80
```

**Solution:**
```bash
# Use sudo for ports < 1024
sudo npm run dev

# Or use higher port in .env
PORT=3000
```

### MongoDB Install

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start
sudo systemctl start mongodb

# Check status
sudo systemctl status mongodb
```

---

## Debug Mode

### Enable Detailed Logging

**Backend:**
```bash
# Set debug env variable
NODE_DEBUG=* npm run server
```

**Frontend:**
```bash
# Check console (F12)
# Look for warnings/errors
```

---

## Reset Everything

**If everything is broken:**

```bash
# Stop servers (Ctrl+C)

# Clear node modules
rm -r node_modules
rm -r client/node_modules
rm package-lock.json
rm client/package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
cd client && npm install && cd ..

# Clear MongoDB (optional)
# Delete database or start fresh

# Try again
npm run dev
```

---

## Get Help

### Check These Files
1. **INSTALL_FIRST.md** - Installation issues
2. **SETUP_GUIDE.md** - Detailed setup steps
3. **README.md** - General documentation
4. **Browser Console** - F12 for errors
5. **Backend Console** - Terminal output

### Browser DevTools (F12)

**Network Tab:**
- See API calls
- Check response status
- Look for CORS errors

**Console Tab:**
- JavaScript errors
- Warning messages
- Network errors

**Application Tab:**
- Check localStorage
- See stored JWT token
- Verify cookies

---

## Quick Fixes Checklist

- [ ] Is MongoDB running?
- [ ] Are ports 3000 & 5000 free?
- [ ] Did you run `npm install` twice?
- [ ] Did you create `.env` file?
- [ ] Is backend running on :5000?
- [ ] Did you add skills before recommendations?
- [ ] Are there errors in F12 console?
- [ ] Can you reach http://localhost:5000/api/health?

---

## Contact Support

If still stuck:
1. Check all docs in project folder
2. Review code comments
3. Check browser console errors
4. Verify environment setup
5. Try resetting everything (see above)

---

## Common Success Indicators

✅ "Server running on port 5000" in terminal
✅ React app opens at localhost:3000
✅ Login page appears
✅ Can create account
✅ Can add skills
✅ Recommendations show with scores
✅ No errors in F12 console

---

**Still having issues? Make sure you've:**
1. Installed Node.js v14+
2. Got MongoDB running
3. Ran `npm install` in root and client
4. Created .env file
5. Updated MongoDB URI if using Atlas

Good luck! 🎯
