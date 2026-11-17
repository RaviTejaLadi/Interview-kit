import { useEffect, useMemo, useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUser } from '@/features/admin/users/hooks/use-admin-user';
import { useUpdateAdminUser } from '@/features/admin/users/hooks/use-update-admin-user';
import type { AdminUpdateUserInput, AdminUser } from '@/features/admin/users/types/users';
import {
  validateAdminUserEdit,
  type AdminUserEditInput,
} from '@/features/admin/users/utils/validation';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import type { FieldErrors } from '@/lib/zod-field-errors';
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

export function AdminUserEditForm({ userId }: { userId: string }) {
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
