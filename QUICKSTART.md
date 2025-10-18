# Quick Start Guide

## 🚀 Get Up and Running in 30 Seconds

### 1. Start the Development Server

The development server should already be running! If not:

```bash
npm run dev
```

### 2. Open Your Browser

Navigate to: **http://localhost:3000**

### 3. Add Your First Job

1. **Fill in the form:**
   - Customer: "ABC Company"
   - Job #: "12345"
   - Date: (today's date is pre-filled)

2. **Track a revision:**
   - Click "Start" on the Submittal timer
   - Add some notes: "Initial submittal for review"
   - Click "Stop" when done
   - Check the box to mark it complete

3. **Save it:**
   - Click "Save Job"

### 4. Explore Features

- **Edit**: Click the green "✏️ Edit" button to modify a job
- **PDF**: Click the blue "📄 PDF" button to download a report
- **Delete**: Click the red "🗑️ Delete" button to remove a job

## 💡 Pro Tips

### Timer Best Practices
- Start the timer when you begin work
- Stop it when taking breaks
- Reset if you need to start over
- Time is saved automatically when you save the job

### Notes
- Use notes to track:
  - Changes requested
  - Issues encountered
  - Communication with customer
  - Materials or specifications

### Organization
- Use consistent job number formats
- Keep customer names standardized
- Add notes as you work, not after

## 📋 Common Workflows

### Workflow 1: New Job
```
1. Add customer & job number
2. Start Submittal timer
3. Add submittal notes
4. Mark as complete
5. Save job
```

### Workflow 2: Job with Revisions
```
1. Find existing job
2. Click Edit
3. Start 1st Revision timer
4. Add revision notes
5. Mark as complete
6. Save job
```

### Workflow 3: Generate Report
```
1. Complete all necessary revisions
2. Click PDF button
3. Share report with team/customer
```

## 🎨 Keyboard Navigation

- **Tab**: Navigate between form fields
- **Space**: Check/uncheck revision boxes
- **Enter**: Submit the form when focused on inputs

## 💾 Data Storage

- All jobs are saved in your browser's localStorage
- Data persists when you:
  - Close the browser
  - Refresh the page
  - Shut down your computer
- Data is cleared if you:
  - Clear browser data
  - Use incognito/private mode
  - Switch browsers

## 🆘 Need Help?

### Timer Not Working?
- Make sure to click "Start" before working
- Only one timer per revision can run at a time
- Click "Stop" to pause, "Reset" to clear

### Jobs Not Saving?
- Fill in all three main fields: Customer, Job #, Date
- Check browser console for errors
- Try refreshing the page

### PDF Not Generating?
- Make sure your browser allows downloads
- Check your browser's download folder
- Try a different browser if issues persist

## 🎯 Next Steps

Once you're comfortable with the basics:

1. **Customize**: Edit colors and styling in the code
2. **Backup**: Export your localStorage data periodically
3. **Scale**: Add more revision types if needed
4. **Share**: Deploy to Vercel or another hosting service

---

**Ready to start tracking jobs? Open http://localhost:3000 and dive in!** 🎉

