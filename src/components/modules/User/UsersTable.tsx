'use client';

import ManagementTable from '@/components/shared/ManagementTable';
import { IUserInfo } from '@/types/user.interface';
import { userColumn } from './UsersColumn';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import UserViewDialog from './UserViewDialog';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import ConfirmActionDialog from '@/components/shared/ConfirmActionDialog';
import SelectActionDialog from '@/components/shared/SelectActionDialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Ban, CircleCheck, Shield } from 'lucide-react';
import { toast } from 'sonner';
import {
  deleteUser,
  updateUserRole,
  updateUserStatus,
} from '@/services/user/userManagements';
import { useUser } from '@/hook/useUser';

interface UserTableProps {
  user: IUserInfo[];
}

const ROLE_OPTIONS = [
  { value: 'USER', label: 'User' },
  { value: 'HOST', label: 'Host' },
  { value: 'ADMIN', label: 'Admin' },
];

const UserTable = ({ user }: UserTableProps) => {
  const router = useRouter();
  const { user: currentUser } = useUser();
  const [, startTransition] = useTransition();

  const [viewingUser, setViewingUser] = useState<IUserInfo | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUserInfo | null>(null);
  const [statusUser, setStatusUser] = useState<IUserInfo | null>(null);
  const [roleUser, setRoleUser] = useState<IUserInfo | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setIsDeleting(true);
    const result = await deleteUser(deletingUser.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || 'User deleted successfully');
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to delete user');
    }
  };

  const confirmStatusToggle = async () => {
    if (!statusUser) return;
    const nextStatus = statusUser.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
    setIsUpdatingStatus(true);
    const result = await updateUserStatus(statusUser.id, nextStatus);
    setIsUpdatingStatus(false);

    if (result.success) {
      toast.success(
        result.message ||
          `User ${nextStatus === 'BLOCKED' ? 'blocked' : 'unblocked'}`
      );
      setStatusUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to update status');
    }
  };

  const confirmRoleChange = async (role: string) => {
    if (!roleUser) return;
    setIsUpdatingRole(true);
    const result = await updateUserRole(
      roleUser.id,
      role as 'USER' | 'HOST' | 'ADMIN'
    );
    setIsUpdatingRole(false);

    if (result.success) {
      toast.success(result.message || 'Role updated');
      setRoleUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || 'Failed to update role');
    }
  };

  return (
    <>
      <ManagementTable
        data={user}
        columns={userColumn}
        getRowKey={(user) => user.id}
        emptyMessage='No user found'
        onView={setViewingUser}
        onDelete={setDeletingUser}
        customActions={(row) => (
          <>
            <DropdownMenuItem onClick={() => setStatusUser(row)}>
              {row.status === 'BLOCKED' ? (
                <>
                  <CircleCheck className='mr-2 h-4 w-4' />
                  Unblock
                </>
              ) : (
                <>
                  <Ban className='mr-2 h-4 w-4' />
                  Block
                </>
              )}
            </DropdownMenuItem>
            {isSuperAdmin && (
              <DropdownMenuItem onClick={() => setRoleUser(row)}>
                <Shield className='mr-2 h-4 w-4' />
                Change role
              </DropdownMenuItem>
            )}
          </>
        )}
      />

      <UserViewDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser!}
      />

      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title='Delete User'
        description={`Are you sure you want to delete user "${deletingUser?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />

      <ConfirmActionDialog
        open={!!statusUser}
        onOpenChange={(open) => !open && setStatusUser(null)}
        onConfirm={confirmStatusToggle}
        title={statusUser?.status === 'BLOCKED' ? 'Unblock user' : 'Block user'}
        description={
          statusUser?.status === 'BLOCKED' ? (
            <>
              Restore access for <strong>{statusUser?.name}</strong>? They will
              be able to log in again.
            </>
          ) : (
            <>
              Block <strong>{statusUser?.name}</strong>? They won&apos;t be able
              to log in until unblocked. No data will be deleted.
            </>
          )
        }
        confirmLabel={
          statusUser?.status === 'BLOCKED' ? 'Unblock' : 'Block user'
        }
        variant={statusUser?.status === 'BLOCKED' ? 'default' : 'destructive'}
        isLoading={isUpdatingStatus}
      />

      <SelectActionDialog
        open={!!roleUser}
        onOpenChange={(open) => !open && setRoleUser(null)}
        onConfirm={confirmRoleChange}
        title='Change user role'
        description={
          <>
            Update the role for <strong>{roleUser?.name}</strong>. Promoting to
            HOST automatically creates a host profile.
          </>
        }
        label='Role'
        options={ROLE_OPTIONS}
        initialValue={roleUser?.role}
        confirmLabel='Update role'
        isLoading={isUpdatingRole}
      />
    </>
  );
};

export default UserTable;
