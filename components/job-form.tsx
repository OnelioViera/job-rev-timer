'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RevisionItem } from '@/components/revision-item';
import { Job, RevisionKey } from '@/types/job';
import { toast } from 'sonner';

interface JobFormProps {
  editingJob: Job | null;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

const revisionKeys: RevisionKey[] = ['submittal', 'rev1', 'rev2', 'rev3', 'rev4'];

export function JobForm({ editingJob, onSave, onCancel }: JobFormProps) {
  const [customer, setCustomer] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobNumber, setJobNumber] = useState('');
  const [date, setDate] = useState('');
  const [revisions, setRevisions] = useState<Job['revisions']>({
    submittal: { checked: false, notes: '', time: '00:00:00' },
    rev1: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
    rev2: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
    rev3: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
    rev4: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
  });
  const [formKey, setFormKey] = useState(0); // Key to force re-render of revision items

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editingJob) {
      setCustomer(editingJob.customer);
      setJobName(editingJob.jobName || '');
      setJobNumber(editingJob.jobNumber);
      setDate(editingJob.date);
      
      // Ensure all revisions have the new fields with defaults
      const updatedRevisions = {
        submittal: {
          ...editingJob.revisions.submittal,
        },
        rev1: {
          ...editingJob.revisions.rev1,
          isDrafting: editingJob.revisions.rev1.isDrafting ?? false,
          isEstimating: editingJob.revisions.rev1.isEstimating ?? false,
          draftingRate: editingJob.revisions.rev1.draftingRate ?? 0,
        },
        rev2: {
          ...editingJob.revisions.rev2,
          isDrafting: editingJob.revisions.rev2.isDrafting ?? false,
          isEstimating: editingJob.revisions.rev2.isEstimating ?? false,
          draftingRate: editingJob.revisions.rev2.draftingRate ?? 0,
        },
        rev3: {
          ...editingJob.revisions.rev3,
          isDrafting: editingJob.revisions.rev3.isDrafting ?? false,
          isEstimating: editingJob.revisions.rev3.isEstimating ?? false,
          draftingRate: editingJob.revisions.rev3.draftingRate ?? 0,
        },
        rev4: {
          ...editingJob.revisions.rev4,
          isDrafting: editingJob.revisions.rev4.isDrafting ?? false,
          isEstimating: editingJob.revisions.rev4.isEstimating ?? false,
          draftingRate: editingJob.revisions.rev4.draftingRate ?? 0,
        },
      };
      
      setRevisions(updatedRevisions);
      setFormKey(prev => prev + 1); // Force re-render of revision items
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Set today's date as default for new jobs
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
    }
  }, [editingJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer || !jobNumber || !date) {
      toast.error('Please fill in all required fields (Customer, Job #, and Date)');
      return;
    }

    const job = {
      ...(editingJob?.id && { id: editingJob.id }),
      customer,
      jobName,
      jobNumber,
      date,
      revisions,
    } as Job;

    onSave(job);

    // Clear form and reset timers
    setCustomer('');
    setJobName('');
    setJobNumber('');
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setRevisions({
      submittal: { checked: false, notes: '', time: '00:00:00' },
      rev1: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev2: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev3: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev4: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
    });
    setFormKey(prev => prev + 1); // Force re-render to reset all timers
  };

  const handleCancel = () => {
    setCustomer('');
    setJobName('');
    setJobNumber('');
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setRevisions({
      submittal: { checked: false, notes: '', time: '00:00:00' },
      rev1: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev2: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev3: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
      rev4: { checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 },
    });
    setFormKey(prev => prev + 1); // Force re-render to reset all timers
    onCancel();
  };

  return (
    <Card className="p-8 mb-8 shadow-2xl" ref={formRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-[#667eea] pb-2">
          {editingJob ? 'Edit Job' : 'Add New Job'}
        </h2>
        <div className="flex items-center gap-3">
          {editingJob && (
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold">
              ✏️ Editing Job
            </span>
          )}
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            title="Close form"
          >
            ✕
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="space-y-2">
            <Label htmlFor="customer" className="text-sm font-semibold uppercase text-gray-700">
              Customer
            </Label>
            <Input
              id="customer"
              type="text"
              placeholder="Enter customer name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobName" className="text-sm font-semibold uppercase text-gray-700">
              Job Name <span className="text-xs text-gray-500">(Optional)</span>
            </Label>
            <Input
              id="jobName"
              type="text"
              placeholder="Enter job name"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobNumber" className="text-sm font-semibold uppercase text-gray-700">
              Job #
            </Label>
            <Input
              id="jobNumber"
              type="text"
              placeholder="Enter job number"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold uppercase text-gray-700">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-5">Revisions</h3>
          <div className="space-y-4">
            {revisionKeys.map((key) => (
              <RevisionItem
                key={`${key}-${formKey}`}
                revisionKey={key}
                checked={revisions[key].checked}
                notes={revisions[key].notes}
                time={revisions[key].time}
                isDrafting={revisions[key].isDrafting}
                isEstimating={revisions[key].isEstimating}
                draftingRate={revisions[key].draftingRate}
                onCheckedChange={(checked) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], checked },
                  }))
                }
                onNotesChange={(notes) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], notes },
                  }))
                }
                onTimeChange={(time) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], time },
                  }))
                }
                onDraftingChange={(isDrafting) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], isDrafting },
                  }))
                }
                onEstimatingChange={(isEstimating) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], isEstimating },
                  }))
                }
                onDraftingRateChange={(draftingRate) =>
                  setRevisions((prev) => ({
                    ...prev,
                    [key]: { ...prev[key], draftingRate },
                  }))
                }
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-lg hover:scale-[1.02] transition-all text-white font-semibold py-6"
          >
            Save Job
          </Button>
          {editingJob && (
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-6"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

