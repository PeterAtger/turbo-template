import { execSync } from 'child_process';

/**
 * Check if Docker Engine is installed
 * @throws {Error} If Docker is not installed
 */
export const checkDockerInstalled = () => {
  execSync(
    "docker version --format '{{.Server.Version}}'",
    { encoding: 'utf-8' },
  );

  return true;
};
