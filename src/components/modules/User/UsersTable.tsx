'use client';

import ManagementTable, { RowAction } from '@/components/shared/ManagementTable';
import { IUserInfo } from '@/types/user.interface';
import { userColumn } from './UsersColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import UserViewDialog from './UserViewDialog';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ConfirmActionDialog from '@/components/dashboard/ConfirmActionDialog';
import { toast } from 'sonner';
import { deleteUser, updateUserStatus } from '@/services/user/userManagements';
import { Ban, ShieldCheck } from 'lucide-react';

interface UserTableProps {
  user: IUserInfo[];
}

const UserTable = ({ user }: UserTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUserInfo | null>(null);
  const [viewingUser, setViewingUser] = useState<IUserInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusTarget, setStatusTarget] = useState<{
    user: IUserInfo;
    next: 'ACTIVE' | 'BLOCKED';
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRefresh = () => startTransition(() => router.refresh());

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setIsDeleting(true);
    const result = await deleteUser(deletingUser.id!);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || 'User deleted');
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete user');
    }
  };

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setIsUpdating(true);
    const result = await updateUserStatus(statusTarget.user.id!, statusTarget.next);
    setIsUpdating(false);
    if (result.success) {
      toast.success(
        statusTarget.next === 'BLOCKED' ? 'User blocked' : 'User unblocked'
      );
      setStatusTarget(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to update status');
    }
  };

  const actions: RowAction<IUserInfo>[] = [
    {
      label: 'Block',
      icon: Ban,
      variant: 'destructive',
      show: (u) => u.status !== 'BLOCKED',
      onClick: (u) => setStatusTarget({ user: u, next: 'BLOCKED' }),
    },
    {
      label: 'Unblock',
      icon: ShieldCheck,
      show: (u) => u.status === 'BLOCKED',
      onClick: (u) => setStatusTarget({ user: u, next: 'ACTIVE' }),
    },
  ];

  return (
    <>
      <ManagementTable
        data={user}
        columns={userColumn}
        getRowKey={(u) => u.id}
        emptyMessage='No users found'
        onView={setViewingUser}
        actions={actions}
        onDelete={setDeletingUser}
      />

      <UserViewDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title='Delete user'
        description={`Delete "${deletingUser?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />

      <ConfirmActionDialog
        open={!!statusTarget}
        onOpenChange={(open) => !open && setStatusTarget(null)}
        onConfirm={confirmStatus}
        title={
          statusTarget?.next === 'BLOCKED' ? 'Block user' : 'Unblock user'
        }
        description={
          statusTarget?.next === 'BLOCKED'
            ? `"${statusTarget?.user.name}" will no longer be able to sign in.`
            : `"${statusTarget?.user.name}" will regain access to their account.`
        }
        confirmLabel={statusTarget?.next === 'BLOCKED' ? 'Block' : 'Unblock'}
        variant={statusTarget?.next === 'BLOCKED' ? 'destructive' : 'default'}
        loading={isUpdating}
      />
    </>
  );
};

export default UserTable;
