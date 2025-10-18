# MongoDB Setup Instructions

Your Job Tracker app is now configured to use MongoDB instead of localStorage! 🎉

## ⚠️ Important: Update Your Database Password

You need to update your `.env.local` file with your actual MongoDB password.

### Step 1: Update .env.local

Open your `.env.local` file and replace `<db_password>` with your actual MongoDB password:

```env
MONGODB_URI=mongodb+srv://ojvwebdesign_db_user:YOUR_ACTUAL_PASSWORD@cluster0.stjayg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

**Example:**
If your password is `mySecurePass123`, it should look like:
```env
MONGODB_URI=mongodb+srv://ojvwebdesign_db_user:mySecurePass123@cluster0.stjayg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Step 2: Restart the Development Server

After updating the password, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🗄️ What Changed

### From localStorage to MongoDB:
- ✅ **Cloud Storage** - All jobs now saved to MongoDB Atlas
- ✅ **Persistent** - Data survives browser clears and works across devices
- ✅ **Scalable** - Can handle unlimited jobs
- ✅ **Secure** - Database credentials in environment variables

### New Files Created:

1. **`lib/mongodb.ts`** - Database connection handler
2. **`models/Job.ts`** - Mongoose schema for jobs
3. **`app/api/jobs/route.ts`** - API endpoints for listing/creating jobs
4. **`app/api/jobs/[id]/route.ts`** - API endpoints for get/update/delete single job
5. **`lib/api.ts`** - Frontend API client functions
6. **`hooks/use-jobs.ts`** - React hook for job operations
7. **`types/global.d.ts`** - TypeScript definitions for global types

### Updated Files:

- **`app/page.tsx`** - Now uses `useJobs` hook instead of `useLocalStorage`
- **`types/job.ts`** - ID type now supports both string (MongoDB) and number
- **`components/job-form.tsx`** - Handles MongoDB IDs
- **`components/job-card.tsx`** - Updated ID types

## 🔄 API Endpoints

Your app now has RESTful API endpoints:

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/[id]` - Get single job
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job

## 🧪 Testing MongoDB Connection

Once you've updated the password and restarted:

1. Open http://localhost:3003
2. Try creating a new job
3. Check your MongoDB Atlas dashboard - you should see the data!

## 🚨 Troubleshooting

### "Failed to fetch jobs" error:
- Check your MongoDB password in `.env.local`
- Ensure your IP is whitelisted in MongoDB Atlas
- Check MongoDB Atlas is running and accessible

### Connection timeout:
- Verify your MongoDB URI is correct
- Check firewall/network settings
- Ensure MongoDB Atlas cluster is active

### Environment variable not found:
- Make sure `.env.local` exists in the project root
- Restart the dev server after changing `.env.local`
- File should NOT have any spaces or quotes around values

## 📊 MongoDB Atlas Setup (if needed)

If you need to configure MongoDB Atlas:

1. Go to https://cloud.mongodb.com
2. Create/select your cluster
3. Database Access → Add user with password
4. Network Access → Add your IP or allow all (0.0.0.0/0)
5. Get connection string from "Connect" button

## 🎉 Benefits of MongoDB

- **Multi-device sync** - Access from any browser
- **Team collaboration** - Share database with team
- **Backup & recovery** - MongoDB Atlas auto-backups
- **Analytics** - Query your job data
- **Production ready** - Deploy anywhere with env vars

---

**Your job tracker is now powered by MongoDB! 🚀**

