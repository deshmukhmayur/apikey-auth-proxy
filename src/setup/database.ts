import mongoose from 'mongoose';
import { MONGODB_URI } from './env';
import logger from './logger';

let RETRY_ATTEMPT = 0;

/* Retry Connection */
async function connectWithRetry() {
  return mongoose.connect(MONGODB_URI);
}
/* Connect database */
export async function setupDatabase() {
  logger.info('[MongoDB]: Connecting Database...');
  await connectWithRetry();
  logger.info('[MongoDB]: Database Connected');
}

/* Close the database connection */
export async function disconnectDatabase() {
  logger.info('[MongoDB]: Closing connection.');
  return await mongoose.disconnect();
}

/* Handle connection error */
mongoose.connection.on('error', (error) => {
  if (RETRY_ATTEMPT > 3) {
    throw error;
  }
  RETRY_ATTEMPT += 1;
  logger.error(`[MongoDB]: Connection failed: ${error.message}`);
  setTimeout(async () => {
    logger.info('[MongoDB]: Retrying Database connection...');
    await connectWithRetry();
  }, 5000);
});

mongoose.set('strictQuery', false);

export { mongoose };
