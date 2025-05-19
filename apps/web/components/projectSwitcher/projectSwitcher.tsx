'use client';

import { ProjectType } from '@repo/database';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Separator } from '@repo/ui/components/separator';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  PlusIcon,
  SquarePenIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import { AddProjectForm } from '@/components/addProjectForm';
import { DeleteProjectForm } from '@/components/deleteProjectForm';
import { EditProjectForm } from '@/components/editProjectForm';
import { useAppSelector } from '@/redux/hooks';
import { currentSelectedProject } from '@/redux/slices/projectSlice';

export function ProjectSwitcher({
  projects,
}: {
  projects: ProjectType[]
}) {
  const selectedProject = useAppSelector(currentSelectedProject);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = React.useState(false);
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] = React.useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = React.useState(false);
  const [deleteProject, setDeleteProject] = React.useState<ProjectType | null>(null);
  const [editableProject, setEditableProject] = React.useState<ProjectType | null>(null);
  const router = useRouter();

  const handleProjectSelect = (project: ProjectType) => {
    router.push(`/projects/${project.identifier}`, { scroll: true });
  };

  useEffect(() => {
    if (editableProject && !isEditProjectDialogOpen) setEditableProject(null);
    if (deleteProject && !isDeleteProjectDialogOpen) setDeleteProject(null);
  }, [isEditProjectDialogOpen, isDeleteProjectDialogOpen, editableProject, deleteProject]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:bg-transparent">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{selectedProject?.name ?? 'Select a Project'}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[216px]"
              align="start"
            >
              {projects.map((project) => (

                <DropdownMenuItem
                  key={project.name}
                  onSelect={() => handleProjectSelect(project)}
                  className="flex flex-row justify-between gap-6 cursor-pointer"
                >
                  {project.name === selectedProject?.name
                    ? <Check className="ml-auto" />
                    : <div style={{ width: '24px' }} className="mr-1" />}
                  <p className="w-full">{project.name}</p>

                  <div className="flex flex-row gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 hover:bg-primary/10"
                      onClick={() => {
                        setIsEditProjectDialogOpen(true);
                        setEditableProject(project);
                      }}
                    >
                      <SquarePenIcon />
                    </Button>
                  </div>

                </DropdownMenuItem>
              ))}
              {!!projects.length && <Separator />}
              <DropdownMenuItem
                className="flex flex-row cursor-pointer h-9"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsAddProjectDialogOpen(true);
                }}
              >
                <PlusIcon className="m-0" />
                Add New Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <AddProjectForm
        isOpen={isAddProjectDialogOpen}
        onOpenChange={setIsAddProjectDialogOpen}
      />
      <DeleteProjectForm
        isOpen={isDeleteProjectDialogOpen}
        onOpenChange={setIsDeleteProjectDialogOpen}
        deletedProject={deleteProject as ProjectType}
      />
      <EditProjectForm
        isOpen={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
        onOpenDelete={setIsDeleteProjectDialogOpen}
        setDeleteProject={setDeleteProject}
        project={editableProject as ProjectType}
      />
    </>
  );
}
