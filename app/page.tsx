'use client';

import { useState } from 'react';
import { JobForm } from '@/components/job-form';
import { JobCard } from '@/components/job-card';
import { useJobs } from '@/hooks/use-jobs';
import { generateJobPDF } from '@/lib/pdf-generator';
import { Job } from '@/types/job';
import { toast } from 'sonner';

export default function Home() {
  const { jobs, isLoading, error, addJob, updateJobById, deleteJobById } = useJobs();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaveJob = async (job: Job) => {
    try {
      if (editingJob) {
        // Update existing job
        await updateJobById(editingJob.id, job);
        setEditingJob(null);
        toast.success('Job updated successfully!');
      } else {
        // Add new job
        await addJob(job);
        toast.success('Job saved successfully!');
      }
      setIsFormOpen(false); // Close form after saving
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save job');
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true); // Open form when editing
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setIsFormOpen(false); // Close form when canceling
  };

  const handleDeleteJob = (jobId: string | number) => {
    toast('Are you sure you want to delete this job?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          try {
            await deleteJobById(jobId);
            if (editingJob?.id === jobId) {
              setEditingJob(null);
            }
            toast.success('Job deleted successfully!');
          } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to delete job');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  const handleDownloadPDF = (job: Job) => {
    generateJobPDF(job);
    toast.success('PDF downloaded successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl p-8 max-w-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ MongoDB Connection Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-yellow-800 font-semibold mb-2">To fix this issue:</p>
            <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1">
              <li>Open your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file</li>
              <li>Replace <code className="bg-yellow-100 px-1 rounded">&lt;db_password&gt;</code> with your actual MongoDB password</li>
              <li>Restart the development server (Ctrl+C, then npm run dev)</li>
            </ol>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-sm text-blue-800">
              📖 Check <code className="bg-blue-100 px-1 rounded">MONGODB_SETUP.md</code> for detailed setup instructions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-center text-5xl font-bold mb-8 drop-shadow-lg">
          📋 Job Tracker
        </h1>

        {/* Create New Job Button */}
        {!isFormOpen && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white hover:bg-gray-50 text-[#667eea] font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center gap-3 text-lg"
            >
              <span className="text-2xl">➕</span>
              Create New Job
            </button>
          </div>
        )}

        {/* Collapsible Job Form */}
        {isFormOpen && (
          <div className="animate-in slide-in-from-top duration-300">
            <JobForm
              editingJob={editingJob}
              onSave={handleSaveJob}
              onCancel={handleCancelEdit}
            />
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-[#667eea]">
            Saved Jobs
          </h2>
          <div>
            {jobs.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-xl">
                No jobs saved yet. Add your first job above!
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                  onDownloadPDF={handleDownloadPDF}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
