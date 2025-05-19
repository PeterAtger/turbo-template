import { goTry } from 'go-try';
import {
  Listr, PRESET_TIMER, ListrLogger,
  ListrDefaultRendererLogLevels,
} from 'listr2';
import Cron from '../services/Cron';
import Database from '../services/Database';
import DatabaseExpress from '../services/DatabaseExpress';
import WebApp from '../services/WebApp';
import { checkDockerInstalled } from '../utils/check-docker';

interface Ctx {
  'verbose': boolean;
}

export default async function stop() {
  const logger = new ListrLogger({ useIcons: false });

  const task: Listr<Ctx> = new Listr<Ctx>(
    [
      {
        title: 'Checking if Docker is installed',
        task: () => { checkDockerInstalled(); },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Stopping database',
        task: async (ctx, t): Promise<void> => {
          const running = await Database.checkRunning();
          if (!running) t.skip('Docker container is already stopped.');

          await Database.stop();
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Stopping database express service',
        task: async (ctx, t): Promise<void> => {
          const running = await DatabaseExpress.checkRunning();
          if (!running) t.skip('Docker container is already stopped.');

          await DatabaseExpress.stop();
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Stopping Web Application',
        task: async (ctx, t): Promise<void> => {
          const running = await WebApp.checkRunning();
          if (!running) t.skip('Docker container is already stopped.');

          await WebApp.stop();
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Stopping Prompter',
        task: async (ctx, t): Promise<void> => {
          const running = await Cron.checkRunning();
          if (!running) t.skip('Docker container is already stopped.');

          await Cron.stop();
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
    ],
    { concurrent: false },
  );

  const [error] = await goTry(() => task.run());

  if (error) {
    logger.log(ListrDefaultRendererLogLevels.FAILED, `Error: ${JSON.stringify(error)}`);
  }
}
