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
});

const JobSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
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
        default: () => ({ checked: false, notes: '', time: '00:00:00' }),
      },
      rev2: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00' }),
      },
      rev3: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00' }),
      },
      rev4: {
        type: RevisionSchema,
        default: () => ({ checked: false, notes: '', time: '00:00:00' }),
      },
    },
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model('Job', JobSchema);

export default Job;

