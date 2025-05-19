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
  const identifier = formData.get('identifier') as string;

  const [err] = await goTry(() => ProjectModel.deleteOne({ identifier }));

  if (err) {
    return {
      success: false,
      message: err ? err.message : 'Failed to delete project',
    };
  }

  return {
    success: true,
    message: 'Project deleted successfully',
  };
};
