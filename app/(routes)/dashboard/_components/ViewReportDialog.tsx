import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-Agent/[sessionId]/page'
import moment from 'moment'

// Helper to safely get report fields or fallback
function getField(report: any, field: string, fallback = 'Not specified') {
  if (!report) return fallback;
  const value = report[field];
  if (Array.isArray(value)) return value.length ? value.join(', ') : fallback;
  return value || fallback;
}

type props={
     record : SessionDetail;
}

function ViewReportDialog({record} :props) { 
  // Prefer the AI-generated report if available
  const report = record.report || {};
  return (
   <Dialog>
  <DialogTrigger asChild>
    <Button variant={'link'} size={'sm'}>View Report</Button> 
  </DialogTrigger>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle asChild>
        <h2 className='text-center text-3xl mb-2'>Medical AI Voice Agent Report</h2>
      </DialogTitle>
      <DialogDescription asChild>
        <div className='space-y-6'>
          {/* Header: Session Info */}
          <div className="border-b pb-2 mb-2">
            <h3 className="font-bold text-blue-600 text-lg mb-1">Session Info</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-semibold">Specialist:</span> {getField(report, 'agent', record.selectedDoctor?.specialist)}</div>
              <div><span className="font-semibold">Date:</span> {moment(new Date(record.createdOn)).format('LLL')}</div>
              <div><span className="font-semibold">Session ID:</span> {getField(report, 'sessionId', record.sessionId)}</div>
            </div>
          </div>

          {/* Duration & Severity */}
          <div className="border-b pb-2 mb-2 grid grid-cols-2 gap-2">
            <div>
              <h3 className="font-bold text-blue-600 text-lg mb-1">Duration</h3>
              <div className="text-sm">{getField(report, 'duration')}</div>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 text-lg mb-1">Severity</h3>
              <div className="text-sm">{getField(report, 'severity')}</div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="border-b pb-2 mb-2">
            <h3 className="font-bold text-blue-600 text-lg mb-1">Symptoms</h3>
            <div className="text-sm">{getField(report, 'symptoms')}</div>
          </div>

          {/* Medicines & Recommendations */}
          <div className="border-b pb-2 mb-2">
            <h3 className="font-bold text-blue-600 text-lg mb-1">Medicines Suggested</h3>
            <div className="text-sm">{getField(report, 'medicationsMentioned')}</div>
          </div>
          <div className="border-b pb-2 mb-2">
            <h3 className="font-bold text-blue-600 text-lg mb-1">Recommendations</h3>
            <div className="text-sm">{getField(report, 'recommendations')}</div>
          </div>

          {/* Conversation Summary */}
          <div className="border-b pb-2 mb-2">
            <h3 className="font-bold text-blue-600 text-lg mb-1">Summary of Conversation</h3>
            <div className="text-sm whitespace-pre-line">{getField(report, 'summary', record.notes)}</div>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-4 text-xs text-gray-500 border-t pt-2">
            This report was generated by AI. Please consult a doctor if the issue is serious.
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default ViewReportDialog 