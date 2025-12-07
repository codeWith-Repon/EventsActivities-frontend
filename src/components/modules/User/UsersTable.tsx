'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IUserInfo } from '@/types/user.interface';
import { userColumn } from './UsersColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import UserViewDialog from './UserViewDialog';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { toast } from 'sonner';
import { deleteUser } from '@/services/user/userManagements';

interface UserTableProps {
  user: IUserInfo[];
}

const UserTable = ({ user }: UserTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUser, setDeletingUser] = useState<IUserInfo | null>(null);
  const [viewingUser, setViewingUser] = useState<IUserInfo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUserInfo) => {
    setViewingUser(user);
  };

  const handleDelete = (user: IUserInfo) => {
    setDeletingUser(user);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    const result = await deleteUser(deletingUser.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'User deleted successfully');
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete user');
    }
  };

  return (
    <>
      <ManagementTable
        data={user}
        columns={userColumn}
        getRowKey={(user) => user.id}
        emptyMessage='No user found'
        onView={handleView}
        onDelete={handleDelete}
      />

      <UserViewDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser!}
      />

      {/* Delete confirmation dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title='Delete User'
        description={`Are you sure you want to delete user "${deletingUser?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;
