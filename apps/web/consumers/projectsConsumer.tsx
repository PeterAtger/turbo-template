'use client';

import { ProjectType } from '@repo/database';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addProjects, clearProjects, setSelectedProject } from '@/redux/slices/projectSlice';

type ProjectProps = {
  projects?: ProjectType[];
};

export function ProjectsConsumer({ projects }: ProjectProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (projects && projects[0]) {
      dispatch(clearProjects());
      dispatch(addProjects(projects));
      dispatch(setSelectedProject(projects[0]));
    }
  }, [dispatch, projects]);

  return null;
}
