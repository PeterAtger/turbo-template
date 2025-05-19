'use server';

import { currentUser } from '@clerk/nextjs/server';
import { ProjectModel, ProjectType } from '@repo/database';
import { PROJECT_STATES } from '@repo/database/consts';
import { errors } from '@repo/utils';
import { goTry } from 'go-try';
import { getIdentifier } from '@/helpers/identifier';
import { FormResultType } from '@/types/FormResult';

export default async (
  prevState: FormResultType<ProjectType>,
  formData: FormData,
): Promise<FormResultType<ProjectType>> => {
  const user = await currentUser();
  const name = formData.get('name') as string;
  const model = formData.get('model') as string;

  if (!user) {
    return {
      success: false,
      message: 'User not logged in',
    };
  }

  if (!name || !model) {
    return {
      success: false,
      message: 'Name and Model are required',
    };
  }

  const [loadErr, existingProject] = await goTry(() => ProjectModel.findOne({
    name,
  }));

  if (loadErr) {
    errors.handleError(loadErr);

    return {
      success: false,
      message: 'Error saving project',
    };
  }

  if (existingProject) {
    return {
      success: false,
      message: 'Project with this name already exists',
    };
  }

  const newProject = new ProjectModel({
    name,
    creatorId: user.id,
    identifier: getIdentifier(name),
    state: PROJECT_STATES.ACTIVE,
    lastUpdateDate: new Date(),
  });

  const [err] = await goTry(() => newProject.save());

  if (err) {
    return {
      success: false,
      message: err.message,
    };
  }

  return { success: true, message: 'Project created successfully' };
};
