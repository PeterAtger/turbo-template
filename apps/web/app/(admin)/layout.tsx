import { currentUser } from '@clerk/nextjs/server';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@repo/ui/components/sidebar';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectsProvider from '@/backend/providers/projectsProvider';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppSidebar } from '@/components/sidebar';
import { ProjectsConsumer } from '@/consumers/projectsConsumer';

export const metadata: Metadata = {
  title: 'Template',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  const projects = await ProjectsProvider.getProjects(user.id);

  return (
    <SidebarProvider>
      <ProjectsConsumer projects={projects} />
      <AppSidebar className="mt-[72px]" variant="inset" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs />
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
