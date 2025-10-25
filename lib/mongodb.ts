import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    
    // Provide helpful error messages
    if (e instanceof Error) {
      if (e.message.includes('ENOTFOUND') || e.message.includes('querySrv')) {
        console.error('❌ MongoDB Connection Error: DNS lookup failed');
        console.error('   This usually means:');
        console.error('   1. You still have <db_password> placeholder in your connection string');
        console.error('   2. Your connection string format is incorrect');
        console.error('   3. There are extra spaces or line breaks in MONGODB_URI');
        console.error('   Check your .env.local file!');
      } else if (e.message.includes('Authentication failed')) {
        console.error('❌ MongoDB Authentication Error: Invalid username or password');
        console.error('   Check your MongoDB credentials in .env.local');
      } else if (e.message.includes('ETIMEDOUT') || e.message.includes('ECONNREFUSED')) {
        console.error('❌ MongoDB Connection Error: Cannot reach MongoDB server');
        console.error('   1. Check if your IP is whitelisted in MongoDB Atlas');
        console.error('   2. Ensure your MongoDB cluster is active');
      }
      console.error('   Original error:', e.message);
    }
    
    throw e;
  }

  return cached.conn;
}

export default connectDB;

