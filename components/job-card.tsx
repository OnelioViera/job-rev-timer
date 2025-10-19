'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Job, revisionShortNames, RevisionKey } from '@/types/job';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (jobId: string | number) => void;
  onDownloadPDF: (job: Job) => void;
}

export function JobCard({ job, onEdit, onDelete, onDownloadPDF }: JobCardProps) {
  const revisions = Object.entries(job.revisions).filter(
    ([, rev]) => rev.checked || rev.notes || (rev.time && rev.time !== '00:00:00')
  );

  // Helper function to calculate cost based on time and rate
  const calculateCost = (timeStr: string, rate?: number) => {
    if (!rate || rate === 0) return 0;
    const parts = timeStr.split(':');
    if (parts.length !== 3) return 0;
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    const totalHours = hours + minutes / 60 + seconds / 3600;
    return totalHours * rate;
  };

  return (
    <Card className="p-5 mb-5 border-l-4 border-l-[#667eea] bg-gray-50 transition-all hover:translate-x-1 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {job.customer}{job.jobName ? ` - ${job.jobName}` : ''} {!job.jobName && `- Job #${job.jobNumber}`}
          </h3>
          <div className="text-sm text-gray-600">
            {job.jobName && `Job #${job.jobNumber} • `}Date: {new Date(job.date).toLocaleDateString()}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => onEdit(job)}
            className="bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            ✏️ Edit
          </Button>
          <Button
            onClick={() => onDownloadPDF(job)}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            size="sm"
          >
            📄 PDF
          </Button>
          <Button
            onClick={() => onDelete(job.id)}
            variant="destructive"
            size="sm"
          >
            🗑️ Delete
          </Button>
        </div>
      </div>
      {revisions.length > 0 && (
        <div className="pt-4 border-t border-gray-300">
          <div className="flex flex-wrap gap-2">
            {revisions.map(([key, rev]) => (
              <div key={key} className="inline-flex items-center gap-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    rev.checked
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {revisionShortNames[key as RevisionKey]}: {rev.checked ? '✓' : '○'}
                  {rev.time !== '00:00:00' ? ` (${rev.time})` : ''}
                </span>
                {rev.isDrafting && (
                  <>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      D
                    </span>
                    {rev.draftingRate && rev.draftingRate > 0 && (
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        ${calculateCost(rev.time, rev.draftingRate).toFixed(2)}
                      </span>
                    )}
                  </>
                )}
                {rev.isEstimating && (
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    E
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

