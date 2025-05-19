import { Logger } from 'pino';

export default class Errors {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  handleError(err: unknown, message?: string) {
    this.logger.error(err, message);
  }
}
