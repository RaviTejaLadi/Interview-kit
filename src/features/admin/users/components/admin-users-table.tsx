import { useEffect, useMemo, useState, type FormEvent } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon, UsersIcon } from 'lucide-react';

import DataTable from '@/components/data-table';
import { DTColumnHeader } from '@/components/data-table/DTColumnHeader';
import { DataTableSkeleton } from '@/components/data-table/DataTableSkeleton';
import DTPagination from '@/components/data-table/DTPagination';
import { DTSearchBox } from '@/components/data-table/toolbar/DTSearchBox';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUser } from '@/features/admin/users/hooks/use-admin-user';
import { useAdminUsers } from '@/features/admin/users/hooks/use-admin-users';
import { useDeleteAdminUser } from '@/features/admin/users/hooks/use-delete-admin-user';
import { useUpdateAdminUser } from '@/features/admin/users/hooks/use-update-admin-user';
import type { AdminUpdateUserInput, AdminUser } from '@/features/admin/users/types/users';
import {
  validateAdminUserEdit,
  type AdminUserEditInput,
} from '@/features/admin/users/utils/validation';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useDataTable } from '@/hooks/useDataTable';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/lib/zod-field-errors';
import { showAlertDialog } from '@/stores/useAlertDialogStore';
import { getApiErrorMessage } from '@/utils/axios';

type UserEditFormState = AdminUserEditInput;

function mapUserToEditForm(user: AdminUser): UserEditFormState {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    phoneNumber: user.phoneNumber ?? '',
    dob: user.dob?.slice(0, 10) ?? '',
    bio: user.bio ?? '',
    role: user.role === 'admin' ? 'admin' : 'user',
  };
}

function UserRoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground',
      )}
    >
      {role}
    </span>
  );
}

function UserProviderBadge({
  provider,
  google,
  github,
}: {
  provider: string;
  google: boolean;
  github: boolean;
}) {
  const label = google ? 'Google' : github ? 'GitHub' : provider;
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        provider === 'local' ? 'bg-muted text-muted-foreground' : 'bg-blue-500/15 text-blue-600',
      )}
    >
      {label}
    </span>
  );
}

type AdminUserEditFormProps = {
  userId: string;
};

function AdminUserEditForm({ userId }: AdminUserEditFormProps) {
  const selectedUser = useAdminUser(userId);
  const updateUser = useUpdateAdminUser();
  const [userForm, setUserForm] = useState<UserEditFormState | null>(null);
  const [userFormErrors, setUserFormErrors] = useState<FieldErrors<keyof AdminUserEditInput>>({});
  const [userFormError, setUserFormError] = useState('');

  useEffect(() => {
    if (!selectedUser.data) {
      return;
    }

    setUserForm(mapUserToEditForm(selectedUser.data));
    setUserFormErrors({});
    setUserFormError('');
  }, [selectedUser.data]);

  const selectedUserName = useMemo(() => {
    if (!selectedUser.data) {
      return '';
    }
    return `${selectedUser.data.firstName} ${selectedUser.data.lastName}`;
  }, [selectedUser.data]);

  function updateUserField(field: keyof UserEditFormState, value: string) {
    setUserForm((current) => (current ? { ...current, [field]: value } : current));
  }

  function handleUpdateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUser.data || !userForm) {
      return;
    }

    const nextErrors = validateAdminUserEdit(userForm);
    setUserFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setUserFormError('');
      updateUser.reset();
      return;
    }

    const current = selectedUser.data;
    const nextFirstName = userForm.firstName.trim();
    const nextLastName = userForm.lastName.trim();
    const nextUserName = userForm.userName.trim();
    const nextPhoneNumber = userForm.phoneNumber.trim();
    const nextDob = userForm.dob.trim();
    const nextBio = userForm.bio.trim();
    const currentPhoneNumber = current.phoneNumber ?? '';
    const currentDob = current.dob?.slice(0, 10) ?? '';
    const currentBio = current.bio ?? '';

    const updates: AdminUpdateUserInput = {};
    if (nextFirstName !== current.firstName) {
      updates.firstName = nextFirstName;
    }
    if (nextLastName !== current.lastName) {
      updates.lastName = nextLastName;
    }
    if (nextUserName !== current.userName) {
      updates.userName = nextUserName;
    }
    if (nextPhoneNumber !== currentPhoneNumber) {
      updates.phoneNumber = nextPhoneNumber;
    }
    if (nextDob !== currentDob) {
      updates.dob = nextDob;
    }
    if (nextBio !== currentBio) {
      updates.bio = nextBio;
    }
    if (userForm.role !== current.role) {
      updates.role = userForm.role;
    }

    if (Object.keys(updates).length === 0) {
      setUserFormError('Change at least one field before updating this user.');
      updateUser.reset();
      return;
    }

    setUserFormError('');
    setUserFormErrors({});
    updateUser.mutate(
      { userId: current.id, input: updates },
      {
        onSuccess: (user) => {
          setUserForm(mapUserToEditForm(user));
        },
      },
    );
  }

  if (selectedUser.isLoading) {
    return <p className="p-3 text-sm text-muted-foreground">Loading user details…</p>;
  }

  if (selectedUser.error) {
    return (
      <div className="p-3">
        <AuthFormError
          message={getApiErrorMessage(selectedUser.error, 'Could not load this user right now.')}
        />
      </div>
    );
  }

  if (!selectedUser.data || !userForm) {
    return <p className="p-3 text-sm text-muted-foreground">User details unavailable.</p>;
  }

  return (
    <form className="space-y-4" onSubmit={handleUpdateUser} noValidate>
      <AuthFormError
        message={
          userFormError ||
          (updateUser.error
            ? getApiErrorMessage(updateUser.error, 'Could not update this user right now.')
            : '')
        }
      />
      <div className="mb-1">
        <p className="text-sm font-medium text-foreground">{selectedUserName}</p>
        <p className="text-xs break-all text-muted-foreground">{selectedUser.data.email}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="editUserFirstName"
          required
          value={userForm.firstName}
          error={userFormErrors.firstName}
          onChange={(event) => updateUserField('firstName', event.target.value)}
        />
        <AuthField
          label="Last name"
          name="editUserLastName"
          required
          value={userForm.lastName}
          error={userFormErrors.lastName}
          onChange={(event) => updateUserField('lastName', event.target.value)}
        />
      </div>
      <AuthField
        label="Username"
        name="editUserName"
        required
        value={userForm.userName}
        error={userFormErrors.userName}
        onChange={(event) => updateUserField('userName', event.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="Phone number"
          name="editUserPhone"
          required
          value={userForm.phoneNumber}
          error={userFormErrors.phoneNumber}
          onChange={(event) => updateUserField('phoneNumber', event.target.value)}
        />
        <AuthField
          label="Date of birth"
          name="editUserDob"
          required
          type="date"
          value={userForm.dob}
          error={userFormErrors.dob}
          onChange={(event) => updateUserField('dob', event.target.value)}
        />
      </div>
      <AuthField label="Bio" name="editUserBio" required error={userFormErrors.bio}>
        <Textarea
          id="editUserBio"
          name="editUserBio"
          rows={3}
          value={userForm.bio}
          aria-invalid={userFormErrors.bio ? true : undefined}
          className={userFormErrors.bio ? 'border-destructive' : undefined}
          onChange={(event) => updateUserField('bio', event.target.value)}
        />
      </AuthField>
      <AuthField label="Role" name="editUserRole" required error={userFormErrors.role}>
        <Select
          value={userForm.role}
          onValueChange={(value) => {
            if (value === 'user' || value === 'admin') {
              updateUserField('role', value);
            }
          }}
        >
          <SelectTrigger
            id="editUserRole"
            aria-invalid={userFormErrors.role ? true : undefined}
            className={userFormErrors.role ? 'border-destructive' : undefined}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">user</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
      </AuthField>
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={updateUser.isPending}>
          {updateUser.isPending ? 'Updating…' : 'Update user'}
        </Button>
      </div>
    </form>
  );
}

function UserRowActions({ user, onEdit }: { user: AdminUser; onEdit: (userId: string) => void }) {
  const deleteUser = useDeleteAdminUser();

  function handleDelete() {
    showAlertDialog({
      variant: 'destructive',
      title: 'Delete user',
      description: `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
      details: 'This permanently removes the account and cannot be undone.',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Delete user',
      loadingBtnText: 'Deleting...',
      confirmActionFn: () => deleteUser.mutateAsync(user.id),
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Actions for ${user.firstName} ${user.lastName}`}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }))}
      >
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!w-40 !min-w-40">
        <DropdownMenuItem onClick={() => onEdit(user.id)}>
          <PencilIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash2Icon />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AdminUsersTable() {
  const users = useAdminUsers(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!editingUserId || !users.data) {
      return;
    }

    const stillExists = users.data.some((user) => user.id === editingUserId);
    if (!stillExists) {
      setEditingUserId(null);
    }
  }, [editingUserId, users.data]);

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        header: ({ column }) => <DTColumnHeader column={column} title="Name" />,
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-foreground">
              {row.original.firstName} {row.original.lastName}
            </p>
            <p className="text-xs text-muted-foreground">@{row.original.userName}</p>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DTColumnHeader column={column} title="Email" />,
        cell: ({ row }) => (
          <span className="break-all text-muted-foreground">{row.original.email}</span>
        ),
      },
      {
        accessorKey: 'provider',
        header: ({ column }) => <DTColumnHeader column={column} title="Provider" />,
        cell: ({ row }) => (
          <UserProviderBadge
            provider={row.original.provider}
            google={row.original.google}
            github={row.original.github}
          />
        ),
      },
      {
        accessorKey: 'role',
        header: ({ column }) => <DTColumnHeader column={column} title="Role" />,
        cell: ({ row }) => <UserRoleBadge role={row.original.role} />,
      },
      {
        id: 'actions',
        enableSorting: false,
        enableHiding: false,
        meta: {
          skipSearchHighlight: true,
          headerClassName: 'w-[1%] text-right',
          cellClassName: 'w-[1%] text-right',
        },
        header: () => <span className="text-xs font-medium text-muted-foreground">Action</span>,
        cell: ({ row }) => <UserRowActions user={row.original} onEdit={setEditingUserId} />,
      },
    ],
    [],
  );

  const { table, globalFilter, setGlobalFilter } = useDataTable({
    data: users.data ?? [],
    columns,
    searchableColumns: ['name', 'email', 'role', 'provider'],
    storageKey: 'admin_users_dt_column_visibility',
    pageSize: 10,
  });

  const usersLoadError = users.error
    ? getApiErrorMessage(users.error, 'Could not load users right now.')
    : '';

  return (
    <Card>
      <CardContent className="px-5 py-6 sm:px-6">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
          <UsersIcon className="size-4 text-primary" />
          User management
        </h2>
        <AuthFormError message={usersLoadError} />

        {users.isLoading ? <DataTableSkeleton /> : null}

        {!users.isLoading ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <DTSearchBox
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                placeholder="Search users…"
              />
              <p className="text-xs text-muted-foreground">
                {users.data?.length ?? 0} user{(users.data?.length ?? 0) === 1 ? '' : 's'}
              </p>
            </div>

            <DataTable table={table} />
            <DTPagination table={table} pageSizeOptions={[5, 10, 20, 50]} />
            <Dialog
              open={Boolean(editingUserId)}
              onOpenChange={(open) => {
                if (!open) {
                  setEditingUserId(null);
                }
              }}
            >
              {editingUserId ? (
                <DialogContent className="max-h-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Edit user</DialogTitle>
                    <DialogDescription>
                      Update this account and save your changes.
                    </DialogDescription>
                  </DialogHeader>
                  <AdminUserEditForm userId={editingUserId} />
                </DialogContent>
              ) : null}
            </Dialog>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
