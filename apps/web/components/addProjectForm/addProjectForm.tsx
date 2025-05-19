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
import { GalleryVerticalEnd, ChevronsUpDown, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import onAddProject from '@/apis/form-actions/onAddProject';
import { useAppDispatch } from '@/redux/hooks';

interface AddProjectFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProjectForm({ isOpen, onOpenChange }: AddProjectFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState('');
  const [formResult, onSubmit, isPending] = useActionState(onAddProject, { success: false, message: '' });
  const router = useRouter();

  const onSubmitSideEffect = (payload: FormData) => {
    payload.append('model', 'gpt-4');

    onSubmit(payload);
  };

  useEffect(() => {
    if (formResult?.success) {
      toast(formResult.message);
      onOpenChange(false);

      router.refresh();
    } else if (formResult?.message) {
      toast(formResult.message);
    }
  }, [dispatch, formResult, onOpenChange, router]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Create a new Project
          </DialogDescription>
        </DialogHeader>

        <form action={onSubmitSideEffect}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                id="name"
                name="name"
                value={name}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="configuration" className="text-right">
                Configuration
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="col-span-3" asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground dark:bg-transparent">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">gpt-4</span>
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
          </div>
          <DialogFooter>
            <Button type="submit" loading={isPending}>Create Project</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
