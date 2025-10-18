import { Job } from '@/types/job';

const API_BASE = '/api/jobs';

export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await fetch(API_BASE);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch jobs');
    }
    
    // Convert MongoDB _id to id for frontend compatibility
    return data.data.map((job: { _id: string; [key: string]: unknown }) => ({
      ...job,
      id: job._id,
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function createJob(job: Omit<Job, 'id'>): Promise<Job> {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create job');
    }
    
    return {
      ...data.data,
      id: data.data._id,
    };
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
}

export async function updateJob(id: string, job: Partial<Job>): Promise<Job> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to update job');
    }
    
    return {
      ...data.data,
      id: data.data._id,
    };
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

export async function deleteJob(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to delete job');
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

