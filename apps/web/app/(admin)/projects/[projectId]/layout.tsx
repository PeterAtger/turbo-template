import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectsProvider from '@/backend/providers/projectsProvider';
import { ProjectConsumer } from '@/consumers/projectConsumer';

export const metadata: Metadata = {
  title: 'Template',
  description: '',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const user = await currentUser();
  const { projectId } = await params;

  if (!user) {
    return notFound();
  }

  const project = await ProjectsProvider.getProjectById(projectId);

  if (!project) {
    return notFound();
  }

  return (
    <>
      <ProjectConsumer project={project} />
      {children}
    </>
  );
}
