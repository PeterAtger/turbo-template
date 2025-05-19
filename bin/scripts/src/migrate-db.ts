import { ListrEnquirerPromptAdapter } from '@listr2/prompt-adapter-enquirer';
import { goTry } from 'go-try';
import {
  Listr, PRESET_TIMER, ListrLogger,
  ListrDefaultRendererLogLevels,
} from 'listr2';
import Database from '../services/Database';
import { checkDockerInstalled } from '../utils/check-docker';
import { migrate } from './db/migrate';

interface Ctx {
  'verbose': boolean;
  input: string;
}

export default async function migrateDb() {
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
        title: 'Pulling data from remote database',
        task: async (ctx, t): Promise<void> => {
          ctx.input = await t.prompt(ListrEnquirerPromptAdapter)
            .run<string>({ type: 'Input', message: 'Please input your remoteDb string :' });

          if (!ctx.input) {
            t.skip('No remoteDb string provided. Skipping data pull.');
            return;
          }

          await migrate(ctx.input, t.stdout());
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
