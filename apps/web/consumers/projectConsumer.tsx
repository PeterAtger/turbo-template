'use client';

import { ProjectType } from '@repo/database';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectedProject } from '@/redux/slices/projectSlice';

type ProjectProps = {
  project: ProjectType;
};

export function ProjectConsumer({ project }: ProjectProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (project) {
      dispatch(setSelectedProject(project));
    }
  }, [dispatch, project]);

  return null;
}
