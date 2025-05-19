import { ProjectType } from '@repo/database';
import { PROJECT_STATES } from '@repo/database/consts';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { SidebarMenuButton } from '@repo/ui/components/sidebar';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import onEditProject from '@/apis/form-actions/onEditProject';
import { useAppDispatch } from '@/redux/hooks';
import { updateProject } from '@/redux/slices/projectSlice';

interface EditProjectFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenDelete: (deleteBool: boolean) => void;
  setDeleteProject: (project: ProjectType | null) => void;
  project?: ProjectType;
}

export function EditProjectForm({
  isOpen, onOpenChange, project, onOpenDelete, setDeleteProject,
}: EditProjectFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [editedProject, setEditedProject] = useState<ProjectType | null>(null);
  const [formResult, onSubmit, isPending] = useActionState(onEditProject, { success: false, message: '' });

  const onSumbitSideEffect = (payload: FormData) => {
    payload.append('project', JSON.stringify(editedProject));

    onSubmit(payload);
  };

  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);

  useEffect(() => {
    if (formResult?.success && formResult?.data) {
      toast(formResult.message);
      dispatch(updateProject(formResult.data));
      onOpenChange(false);

      router.refresh();
    } else if (formResult?.message) {
      toast(formResult.message);
    }
  }, [dispatch, editedProject, formResult, onOpenChange, router]);

  if (!project || !editedProject) {
    return null;
  }

  const handleStateChange = (state: string) => {
    setEditedProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        state,
      };
    });
  };

  const handleNameChange = (name: string) => {
    setEditedProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        name,
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Change project settings
          </DialogDescription>
        </DialogHeader>
        <form action={onSumbitSideEffect}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                id="name"
                name="name"
                value={editedProject!.name}
                className="col-span-3"
                onChange={(e) => { handleNameChange(e.target.value); }}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="configuration" className="text-right w-24">
                Configuration
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground col-span-3"
                  >
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    {/* TODO fetch models */}
                    <span>gpt-4</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="status" className="text-right col-span-1">
                State
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground col-span-3"
                  >
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">
                        {editedProject!.state}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  {
                    Object.values(PROJECT_STATES).map((state) => (
                      <DropdownMenuItem
                        key={state}
                        onSelect={() => handleStateChange(state)}
                      >
                        <span>{state}</span>

                        {editedProject!.state === state && <Check className="mr-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="hover:bg-red-600/85 hover:text-white"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onOpenChange(false);
                setDeleteProject(project);
                onOpenDelete(true);
              }}
            >
              Delete Project
            </Button>
            <Button type="submit" loading={isPending}>Save Project</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
