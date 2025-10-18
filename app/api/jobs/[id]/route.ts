import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

// GET single job
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch job' }, { status: 500 });
  }
}

// PUT update job
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const job = await Job.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ success: false, error: 'Failed to update job' }, { status: 500 });
  }
}

// DELETE job
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const job = await Job.findByIdAndDelete(id);
    
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete job' }, { status: 500 });
  }
}

