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

  return (
    <Card className="p-5 mb-5 border-l-4 border-l-[#667eea] bg-gray-50 transition-all hover:translate-x-1 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {job.customer} - Job #{job.jobNumber}
          </h3>
          <div className="text-sm text-gray-600">
            Date: {new Date(job.date).toLocaleDateString()}
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
              <span
                key={key}
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  rev.checked
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {revisionShortNames[key as RevisionKey]}: {rev.checked ? '✓' : '○'}
                {rev.time !== '00:00:00' ? ` (${rev.time})` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

