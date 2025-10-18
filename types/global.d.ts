import type Mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof Mongoose | null;
    promise: Promise<typeof Mongoose> | null;
  };
}

export {};

