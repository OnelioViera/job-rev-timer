import { Schema, model, models } from 'mongoose';

const RevisionSchema = new Schema({
  checked: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: '00:00:00',
  },
  isDrafting: {
    type: Boolean,
    default: false,
  },
  isEstimating: {
    type: Boolean,
    default: false,
  },
  draftingRate: {
    type: Number,
    default: 0,
  },
}, { _id: true, strict: false });

const JobSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: false,
    },
    jobNumber: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    revisions: {
      submittal: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00' }),
      },
      rev1: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 }),
      },
      rev2: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 }),
      },
      rev3: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 }),
      },
      rev4: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00', isDrafting: false, isEstimating: false, draftingRate: 0 }),
      },
    },
  },
  {
    timestamps: true,
  }
);

// Use existing model if available, otherwise create new one
const Job = models.Job || model('Job', JobSchema);

export default Job;

