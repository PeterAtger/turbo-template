import { ProjectType } from '@repo/database';
import { Button } from '@repo/ui/components/button';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@repo/ui/components/dialog';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import onDeleteProject from '@/apis/form-actions/onDeleteProject';
import { useAppDispatch } from '@/redux/hooks';

interface DeleteProjectFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deletedProject: ProjectType;
}

export function DeleteProjectForm({
  isOpen,
  onOpenChange,
  deletedProject,
}: DeleteProjectFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formResult, onSubmit, isPending] = useActionState(onDeleteProject, { success: false, message: '' });

  const onSubmitSideEffect = (payload: FormData) => {
    payload.append('identifier', deletedProject.identifier || '');

    onSubmit(payload);
  };

  useEffect(() => {
    if (formResult?.success) {
      toast(formResult.message);

      onOpenChange(false);

      router.replace('/projects');
      router.refresh();
    } else if (formResult?.message) {
      toast(formResult.message);
    }
  }, [deletedProject, dispatch, formResult, onOpenChange, router]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription> Are you sure ?</DialogDescription>
        </DialogHeader>
        <form action={onSubmitSideEffect}>
          <DialogFooter>
            <Button type="submit" loading={isPending} className="hover:bg-red-600/85 hover:text-white" variant="outline">Delete Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
