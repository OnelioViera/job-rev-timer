'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import * as api from '@/lib/api';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedJobs = await api.fetchJobs();
      setJobs(fetchedJobs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs';
      setError(errorMessage);
      console.error('Error loading jobs:', err);
      
      // Show a more helpful error message
      if (errorMessage.includes('Server returned non-JSON response') || errorMessage.includes('HTTP error')) {
        setError('MongoDB connection error. Please check your .env.local file and ensure MONGODB_URI is configured correctly.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addJob = async (job: Omit<Job, 'id'>) => {
    try {
      const newJob = await api.createJob(job);
      setJobs((prev) => [newJob, ...prev]);
      return newJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
      throw err;
    }
  };

  const updateJobById = async (id: string | number, updates: Partial<Job>) => {
    try {
      const updatedJob = await api.updateJob(String(id), updates);
      setJobs((prev) => prev.map((j) => (String(j.id) === String(id) ? updatedJob : j)));
      return updatedJob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
      throw err;
    }
  };

  const deleteJobById = async (id: string | number) => {
    try {
      await api.deleteJob(String(id));
      setJobs((prev) => prev.filter((j) => String(j.id) !== String(id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
      throw err;
    }
  };

  return {
    jobs,
    isLoading,
    error,
    addJob,
    updateJobById,
    deleteJobById,
    refreshJobs: loadJobs,
  };
}

