# Job Tracker

A professional job tracking application built with Next.js, TypeScript, and shadcn/ui components. Track customer jobs, manage multiple revisions, and export detailed PDF reports.

## Features

- ✨ **Modern UI**: Beautiful gradient design with shadcn/ui components
- ⏱️ **Timer Functionality**: Track time spent on each revision with start/stop/reset controls
- 📝 **Notes Management**: Add detailed notes for each revision
- ✅ **Completion Tracking**: Mark revisions as completed with checkboxes
- 💾 **Local Storage**: All data persists in your browser
- 📄 **PDF Export**: Generate professional PDF reports for each job
- ✏️ **Edit & Delete**: Full CRUD operations for jobs
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **PDF Generation**: jsPDF
- **State Management**: React Hooks + localStorage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding a Job

1. Fill in the customer name, job number, and date
2. For each revision (Submittal, 1st-4th Revision):
   - Use the timer to track time spent
   - Add notes in the textarea
   - Check the checkbox when completed
3. Click "Save Job"

### Managing Jobs

- **Edit**: Click the "Edit" button on any job card to modify it
- **Delete**: Click the "Delete" button to remove a job
- **PDF Export**: Click the "PDF" button to download a professional report

### Timer Controls

- **Start**: Begin tracking time for a revision
- **Stop**: Pause the timer
- **Reset**: Set the timer back to 00:00:00

## Project Structure

```
job-rev-timer/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main job tracker page
│   └── globals.css         # Global styles and theme
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── job-form.tsx        # Job creation/editing form
│   ├── job-card.tsx        # Job display card
│   └── revision-item.tsx   # Individual revision component
├── hooks/
│   ├── use-local-storage.ts # localStorage persistence hook
│   └── use-timer.ts        # Timer management hook
├── lib/
│   ├── pdf-generator.ts    # PDF export functionality
│   └── utils.ts            # Utility functions
└── types/
    └── job.ts              # TypeScript type definitions
```

## Build for Production

```bash
npm run build
npm start
```

## Features in Detail

### Revision Tracking

Each job includes 5 revision types:
- Submittal
- 1st Revision
- 2nd Revision
- 3rd Revision
- 4th Revision

Each revision includes:
- Completion checkbox
- Timer (HH:MM:SS format)
- Notes textarea

### Data Persistence

All job data is automatically saved to browser localStorage:
- Jobs persist across page refreshes
- Timers save their current state
- Notes and checkboxes are preserved

### PDF Reports

Generated PDFs include:
- Job details (customer, job number, date)
- All revision statuses
- Time spent on each revision
- Notes for each revision
- Generation timestamp

## Customization

### Theme Colors

The app uses a purple gradient theme. To customize, edit the gradient in `app/page.tsx`:

```tsx
className="bg-gradient-to-br from-[#667eea] to-[#764ba2]"
```

### Adding More Revisions

To add more revision types:

1. Update the `Job` type in `types/job.ts`
2. Add the new revision key to the `revisionKeys` array in `components/job-form.tsx`
3. Update the `revisionNames` mapping

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
