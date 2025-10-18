import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

// GET all jobs
export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

// POST create new job
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const job = await Job.create(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ success: false, error: 'Failed to create job' }, { status: 500 });
  }
}

