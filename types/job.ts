export interface Revision {
  checked: boolean;
  notes: string;
  time: string;
  isDrafting?: boolean;
  isEstimating?: boolean;
  draftingRate?: number;
}

export interface Job {
  id: string | number;
  customer: string;
  jobName?: string;
  jobNumber: string;
  date: string;
  revisions: {
    submittal: Revision;
    rev1: Revision;
    rev2: Revision;
    rev3: Revision;
    rev4: Revision;
  };
}

export type RevisionKey = 'submittal' | 'rev1' | 'rev2' | 'rev3' | 'rev4';

export const revisionNames: Record<RevisionKey, string> = {
  submittal: 'Submittal',
  rev1: '1st Revision',
  rev2: '2nd Revision',
  rev3: '3rd Revision',
  rev4: '4th Revision',
};

export const revisionShortNames: Record<RevisionKey, string> = {
  submittal: 'Submittal',
  rev1: '1st Rev',
  rev2: '2nd Rev',
  rev3: '3rd Rev',
  rev4: '4th Rev',
};

