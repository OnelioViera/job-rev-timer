'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
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
  isDrafting?: boolean;
  isEstimating?: boolean;
  draftingRate?: number;
  onCheckedChange: (checked: boolean) => void;
  onNotesChange: (notes: string) => void;
  onTimeChange: (time: string) => void;
  onDraftingChange?: (checked: boolean) => void;
  onEstimatingChange?: (checked: boolean) => void;
  onDraftingRateChange?: (rate: number) => void;
}

export function RevisionItem({
  revisionKey,
  checked,
  notes,
  time,
  isDrafting,
  isEstimating,
  draftingRate,
  onCheckedChange,
  onNotesChange,
  onTimeChange,
  onDraftingChange,
  onEstimatingChange,
  onDraftingRateChange,
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

  const showExtraCheckboxes = revisionKey !== 'submittal';

  // Calculate cost based on time and drafting rate
  const calculateCost = () => {
    if (!isDrafting || !draftingRate || draftingRate === 0) return 0;
    const hours = timer.seconds / 3600;
    return hours * draftingRate;
  };

  const cost = calculateCost();

  return (
    <div className="bg-white p-5 rounded-lg border-2 border-gray-200 transition-all hover:border-[#667eea] hover:shadow-md">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
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
          {showExtraCheckboxes && (
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${revisionKey}-drafting`}
                  checked={isDrafting || false}
                  onCheckedChange={(checked) => onDraftingChange?.(checked as boolean)}
                />
                <Label
                  htmlFor={`${revisionKey}-drafting`}
                  className="text-sm cursor-pointer text-gray-700"
                >
                  Drafting
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${revisionKey}-estimating`}
                  checked={isEstimating || false}
                  onCheckedChange={(checked) => onEstimatingChange?.(checked as boolean)}
                />
                <Label
                  htmlFor={`${revisionKey}-estimating`}
                  className="text-sm cursor-pointer text-gray-700"
                >
                  Estimating
                </Label>
              </div>
            </div>
          )}
          {isDrafting && showExtraCheckboxes && (
            <div className="flex items-center gap-2 ml-4">
              <Label htmlFor={`${revisionKey}-rate`} className="text-sm text-gray-700 whitespace-nowrap">
                Rate:
              </Label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id={`${revisionKey}-rate`}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={draftingRate || ''}
                  onChange={(e) => onDraftingRateChange?.(parseFloat(e.target.value) || 0)}
                  className="pl-6 w-24 h-8 text-sm"
                />
              </div>
              <span className="text-sm text-gray-500">/hr</span>
              {cost > 0 && (
                <div className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-md font-semibold text-sm">
                  Cost: ${cost.toFixed(2)}
                </div>
              )}
            </div>
          )}
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

