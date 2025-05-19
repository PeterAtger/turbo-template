import * as compose from 'docker-compose';
import * as path from 'path';

const COMPOSERS_PATH = path.join(__dirname, '../', 'composers');
const SERVICE_NAME = 'cron';
const CONTAINER_NAME = 'cron_container';

export default class Cron {
  // eslint-disable-next-line no-undef
  static async start(stream?: NodeJS.WritableStream) {
    if (!await this.checkRunning()) {
      await compose.upOne(SERVICE_NAME, {
        cwd: COMPOSERS_PATH,
        callback: (chunk) => { stream?.write(chunk); },
      });
    }
  }

  static async checkRunning() {
    const { err, data: { services } } = await compose.ps({ cwd: COMPOSERS_PATH });

    if (err) {
      throw new Error(err);
    }

    if (services.some((service) => service.name === CONTAINER_NAME)) {
      return true;
    }

    return false;
  }

  static async stop() {
    if (await this.checkRunning()) {
      await compose.stopOne(SERVICE_NAME, {
        cwd: COMPOSERS_PATH,
        log: false,
      });
    }
  }
}
