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
  'dbOnly': boolean;
}

export default async function start(dbOnly :boolean = false) {
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
        title: 'Starting up database',
        task: async (ctx, t): Promise<void> => {
          const running = await Database.checkRunning();
          if (running) {
            t.skip('Docker container is already running.');
            return;
          }

          const stdout = t.stdout();
          await Database.start(stdout);
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Starting up database express service',
        task: async (ctx, t): Promise<void> => {
          const running = await DatabaseExpress.checkRunning();
          if (running) {
            t.skip('Docker container is already running.');
            return;
          }

          const stdout = t.stdout();
          await DatabaseExpress.start(stdout);
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Starting up Web Application',
        task: async (ctx, t): Promise<void> => {
          if (ctx.dbOnly) {
            t.skip('Skipping WebApp startup as --db-only flag is set.');
            return;
          }

          const running = await WebApp.checkRunning();

          if (running) {
            t.skip('Docker container is already running.');
            return;
          }

          const stdout = t.stdout();
          await WebApp.start(stdout);
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },
      {
        title: 'Starting up Prompter',
        task: async (ctx, t): Promise<void> => {
          if (ctx.dbOnly) {
            t.skip('Skipping Prompter startup as --db-only flag is set.');
            return;
          }

          const running = await Cron.checkRunning();
          if (running) {
            t.skip('Docker container is already running.');
            return;
          }

          const stdout = t.stdout();
          await Cron.start(stdout);
        },
        rendererOptions: {
          timer: PRESET_TIMER,
        },
      },

    ],
    { concurrent: false },
  );

  const [error] = await goTry(() => task.run({ dbOnly }));

  if (error) {
    logger.log(ListrDefaultRendererLogLevels.FAILED, `Error: ${JSON.stringify(error)}`);
  }
}
