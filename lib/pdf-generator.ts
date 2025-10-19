import { jsPDF } from 'jspdf';
import { Job, revisionNames } from '@/types/job';

function parseTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':');
  if (parts.length !== 3) return 0;
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const seconds = parseInt(parts[2], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function formatSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculateCost(seconds: number, rate: number): number {
  const hours = seconds / 3600;
  return hours * rate;
}

export function generateJobPDF(job: Job) {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Drafting Job Report', 20, 20);

  // Add job details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Customer: ${job.customer}`, 20, 35);
  if (job.jobName) {
    doc.text(`Job Name: ${job.jobName}`, 20, 45);
    doc.text(`Job Number: ${job.jobNumber}`, 20, 55);
    doc.text(`Date: ${new Date(job.date).toLocaleDateString()}`, 20, 65);
  } else {
    // Backward compatibility for jobs without jobName
    doc.text(`Job Number: ${job.jobNumber}`, 20, 45);
    doc.text(`Date: ${new Date(job.date).toLocaleDateString()}`, 20, 55);
  }

  // Add revisions section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const revisionsY = job.jobName ? 80 : 70;
  doc.text('Revisions:', 20, revisionsY);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  let yPosition = job.jobName ? 95 : 85;
  let totalSeconds = 0;
  let totalCost = 0;

  for (const [key, rev] of Object.entries(job.revisions)) {
    // Revision name and status
    doc.setFont('helvetica', 'bold');
    doc.text(`${revisionNames[key as keyof typeof revisionNames]}:`, 20, yPosition);
    doc.setFont('helvetica', 'normal');
    
    // Build status with flags
    let statusText = rev.checked ? 'Completed' : 'Pending';
    const flags: string[] = [];
    
    // Check for drafting/estimating flags
    if (rev.isDrafting === true) flags.push('Drafting');
    if (rev.isEstimating === true) flags.push('Estimating');
    
    if (flags.length > 0) {
      statusText += ` [${flags.join(', ')}]`;
    }
    
    doc.text(statusText, 70, yPosition);

    // Time if available
    if (rev.time && rev.time !== '00:00:00') {
      doc.text(`Time: ${rev.time}`, 130, yPosition);
      totalSeconds += parseTimeToSeconds(rev.time);
      
      // Add drafting rate and cost if applicable
      if (rev.isDrafting && rev.draftingRate && rev.draftingRate > 0) {
        const revSeconds = parseTimeToSeconds(rev.time);
        const cost = calculateCost(revSeconds, rev.draftingRate);
        totalCost += cost;
        yPosition += 8;
        doc.setFontSize(10);
        doc.text(`Rate: $${rev.draftingRate.toFixed(2)}/hr | Cost: $${cost.toFixed(2)}`, 25, yPosition);
        doc.setFontSize(11);
      }
    }

    yPosition += 8;

    // Notes if available
    if (rev.notes) {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(`Notes: ${rev.notes}`, 170);
      doc.text(lines, 25, yPosition);
      yPosition += lines.length * 5 + 3;
    }

    yPosition += 5;
    doc.setFontSize(11);

    // Check if we need a new page
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
  }

  // Add total time and cost
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  
  // Draw a line separator
  doc.setLineWidth(0.5);
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  const totalTimeStr = formatSeconds(totalSeconds);
  doc.text(`TOTAL TIME: ${totalTimeStr}`, 20, yPosition);
  
  // Add total cost if there's any drafting work
  if (totalCost > 0) {
    yPosition += 10;
    doc.text(`TOTAL COST: $${totalCost.toFixed(2)}`, 20, yPosition);
  }

  // Add footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 20, 280);

  // Save the PDF
  const fileName = job.jobName 
    ? `Job_${job.jobNumber}_${job.jobName.replace(/\s+/g, '_')}.pdf`
    : `Job_${job.jobNumber}_${job.customer.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}

