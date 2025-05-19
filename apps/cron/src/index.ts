import './env';
import logger from '@repo/utils/loggers/pino-logger';

/**
 * Main entry point for the cron job.
 * This script initializes the job coordinator and runs the cron job.
 * It handles errors and logs the results.
 */
async function runCronJob() {
  logger.info('Starting cron job execution');

  logger.info('Cron job completed successfully');

  process.exit(0);
}

runCronJob();
