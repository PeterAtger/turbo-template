'use server';

import { currentUser } from '@clerk/nextjs/server';
import { ProjectModel, ProjectType } from '@repo/database';
import { goTry } from 'go-try';
import { FormResultType } from '@/types/FormResult';

export default async (
  prevState: FormResultType<ProjectType>,
  formData: FormData,
): Promise<FormResultType<ProjectType>> => {
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      message: 'User not logged in',
    };
  }
  const project: ProjectType = JSON.parse(formData.get('project') as string);

  if (!project) {
    return {
      success: false,
      message: 'Name, Model and Project ID are required',
    };
  }

  const [err] = await goTry(() => ProjectModel.findOneAndUpdate(
    { identifier: project.identifier, userId: user.id },
    {
      name: project.name,
      state: project.state,
      lastUpdateDate: new Date(),
    },
    { new: true },
  ));

  if (err) {
    return {
      success: false,
      message: err.message,
    };
  }

  return {
    success: true,
    message: 'Success',
  };
};
