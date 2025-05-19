import { existsSync, mkdirSync } from 'fs';
import pino from 'pino';
import pretty from 'pino-pretty';

const getLogger = () => {
  const path = './logs';

  if (!existsSync(path) && !process.env.DEVELOPMENT) {
    mkdirSync(path);
  }

  if (process.env.DEVELOPMENT) {
    const stream = pretty({
      colorize: true,
      colorizeObjects: false,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    });

    return pino(stream);
  }

  const stream = pretty({
    colorize: false,
    colorizeObjects: false,
    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    destination: pino.destination(`${path}/pino-logger.log`),
  });

  return pino(stream);
};

export default getLogger();
