import { generateShortUID } from '@repo/utils/src/crypher';

export function getIdentifier(projectName: string): string {
  const lowerProjectName = projectName.toLowerCase().replaceAll(' ', '-');
  return `${lowerProjectName}-${generateShortUID()}`;
}
