'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTimer, formatTime, parseTime } from '@/hooks/use-timer';
import { RevisionKey, revisionNames } from '@/types/job';
import { useEffect, useRef } from 'react';

interface RevisionItemProps {
  revisionKey: RevisionKey;
  checked: boolean;
  notes: string;
  time: string;
  onCheckedChange: (checked: boolean) => void;
  onNotesChange: (notes: string) => void;
  onTimeChange: (time: string) => void;
}

export function RevisionItem({
  revisionKey,
  checked,
  notes,
  time,
  onCheckedChange,
  onNotesChange,
  onTimeChange,
}: RevisionItemProps) {
  const timer = useTimer(0);
  const isInitialized = useRef(false);

  // Initialize timer with existing time value
  useEffect(() => {
    if (!isInitialized.current && time && time !== '00:00:00') {
      const seconds = parseTime(time);
      timer.setTime(seconds);
      isInitialized.current = true;
    }
  }, [time, timer]);

  useEffect(() => {
    // Update parent when timer changes
    onTimeChange(formatTime(timer.seconds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.seconds]);

  return (
    <div className="bg-white p-5 rounded-lg border-2 border-gray-200 transition-all hover:border-[#667eea] hover:shadow-md">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id={revisionKey}
            checked={checked}
            onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
          />
          <Label
            htmlFor={revisionKey}
            className="text-base font-semibold cursor-pointer"
          >
            {revisionNames[revisionKey]}
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold text-[#667eea] min-w-[90px]">
            {formatTime(timer.seconds)}
          </span>
          <Button
            type="button"
            onClick={timer.start}
            disabled={timer.isRunning}
            className="bg-green-500 hover:bg-green-600 text-white"
            size="sm"
          >
            Start
          </Button>
          <Button
            type="button"
            onClick={timer.stop}
            disabled={!timer.isRunning}
            className="bg-red-500 hover:bg-red-600 text-white"
            size="sm"
          >
            Stop
          </Button>
          <Button
            type="button"
            onClick={timer.reset}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            Reset
          </Button>
        </div>
      </div>
      <Textarea
        id={`${revisionKey}-notes`}
        placeholder={`Enter notes for ${revisionNames[revisionKey].toLowerCase()}...`}
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="min-h-[80px]"
      />
    </div>
  );
}

