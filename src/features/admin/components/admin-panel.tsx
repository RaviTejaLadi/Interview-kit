import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  AtSignIcon,
  CalendarDaysIcon,
  FileTextIcon,
  MailIcon,
  MessageSquareTextIcon,
  PhoneIcon,
  ShieldIcon,
  Trash2Icon,
  UserCircle2Icon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdminFeedback } from '@/features/admin/hooks/use-admin-feedback';
import { useAdminFeedbacks } from '@/features/admin/hooks/use-admin-feedbacks';
import { useAdminUser } from '@/features/admin/hooks/use-admin-user';
import { useAdminUsers } from '@/features/admin/hooks/use-admin-users';
import { useCreateAdmin } from '@/features/admin/hooks/use-create-admin';
import { useDeleteAdminFeedback } from '@/features/admin/hooks/use-delete-admin-feedback';
import { useDeleteAdminUser } from '@/features/admin/hooks/use-delete-admin-user';
import { useUpdateAdminUser } from '@/features/admin/hooks/use-update-admin-user';
import type { AdminUpdateUserInput, AdminUser } from '@/features/admin/types/admin';
import { validateAdminUserEdit, type AdminUserEditInput } from '@/features/admin/utils/validation';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { AuthPasswordField } from '@/features/auth/components/auth-password-field';
import { validateRegister } from '@/features/auth/utils/validation';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/lib/zod-field-errors';
import { getApiErrorMessage } from '@/utils/axios';

type CreateAdminFormState = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dob: string;
  bio: string;
};

type UserEditFormState = AdminUserEditInput;

const emptyCreateAdminForm: CreateAdminFormState = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  dob: '',
  bio: '',
};

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

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

type AdminPanelSection = 'admin-users' | 'admin-feedback' | 'admin-create';

export function AdminPanel({ section }: { section: AdminPanelSection }) {
  const isCreateSection = section === 'admin-create';
  const isUsersSection = section === 'admin-users';
  const isFeedbackSection = section === 'admin-feedback';
  const createAdmin = useCreateAdmin();
  const users = useAdminUsers(isUsersSection);
  const updateUser = useUpdateAdminUser();
  const deleteUser = useDeleteAdminUser();
  const feedbacks = useAdminFeedbacks(isFeedbackSection);
  const deleteFeedback = useDeleteAdminFeedback();

  const [createAdminForm, setCreateAdminForm] =
    useState<CreateAdminFormState>(emptyCreateAdminForm);
  const [createAdminErrors, setCreateAdminErrors] = useState<ReturnType<typeof validateRegister>>(
    Object.create(null),
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<UserEditFormState | null>(null);
  const [userFormErrors, setUserFormErrors] = useState<FieldErrors<keyof AdminUserEditInput>>({});
  const [userFormError, setUserFormError] = useState('');
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);

  const selectedUser = useAdminUser(isUsersSection ? selectedUserId : null);
  const selectedFeedback = useAdminFeedback(isFeedbackSection ? selectedFeedbackId : null);

  useEffect(() => {
    if (!isUsersSection) {
      return;
    }

    if (!users.data || users.data.length === 0) {
      setSelectedUserId(null);
      return;
    }

    const stillExists = selectedUserId && users.data.some((user) => user.id === selectedUserId);
    if (!stillExists) {
      setSelectedUserId(users.data[0].id);
    }
  }, [isUsersSection, selectedUserId, users.data]);

  useEffect(() => {
    if (!isFeedbackSection) {
      return;
    }

    if (!feedbacks.data || feedbacks.data.length === 0) {
      setSelectedFeedbackId(null);
      return;
    }

    const stillExists =
      selectedFeedbackId && feedbacks.data.some((feedback) => feedback.id === selectedFeedbackId);
    if (!stillExists) {
      setSelectedFeedbackId(feedbacks.data[0].id);
    }
  }, [feedbacks.data, isFeedbackSection, selectedFeedbackId]);

  useEffect(() => {
    if (!isUsersSection) {
      return;
    }

    if (!selectedUser.data) {
      return;
    }

    setUserForm(mapUserToEditForm(selectedUser.data));
    setUserFormErrors({});
    setUserFormError('');
  }, [isUsersSection, selectedUser.data]);

  const usersLoadError = users.error
    ? getApiErrorMessage(users.error, 'Could not load users right now.')
    : '';
  const userLoadError = selectedUser.error
    ? getApiErrorMessage(selectedUser.error, 'Could not load this user right now.')
    : '';
  const feedbackLoadError = feedbacks.error
    ? getApiErrorMessage(feedbacks.error, 'Could not load feedback right now.')
    : '';
  const selectedFeedbackLoadError = selectedFeedback.error
    ? getApiErrorMessage(selectedFeedback.error, 'Could not load this feedback right now.')
    : '';

  const selectedUserName = useMemo(() => {
    if (!selectedUser.data) {
      return '';
    }
    return `${selectedUser.data.firstName} ${selectedUser.data.lastName}`;
  }, [selectedUser.data]);

  function updateCreateAdminField(field: keyof CreateAdminFormState, value: string) {
    setCreateAdminForm((current) => ({ ...current, [field]: value }));
  }

  function updateUserField(field: keyof UserEditFormState, value: string) {
    setUserForm((current) => (current ? { ...current, [field]: value } : current));
  }

  function handleCreateAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegister(createAdminForm);
    setCreateAdminErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      createAdmin.reset();
      return;
    }

    const trimmedBio = createAdminForm.bio.trim();
    createAdmin.mutate(
      {
        firstName: createAdminForm.firstName.trim(),
        lastName: createAdminForm.lastName.trim(),
        userName: createAdminForm.userName.trim(),
        email: createAdminForm.email.trim(),
        password: createAdminForm.password,
        phoneNumber: createAdminForm.phoneNumber.trim(),
        dob: createAdminForm.dob,
        ...(trimmedBio ? { bio: trimmedBio } : {}),
      },
      {
        onSuccess: () => {
          setCreateAdminForm(emptyCreateAdminForm);
          setCreateAdminErrors(Object.create(null));
        },
      },
    );
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

  function handleDeleteUser(userId: string) {
    const target = users.data?.find((user) => user.id === userId);
    const label = target ? `${target.firstName} ${target.lastName}` : 'this user';
    if (!window.confirm(`Delete ${label}? This action cannot be undone.`)) {
      return;
    }

    deleteUser.mutate(userId, {
      onSuccess: () => {
        if (selectedUserId === userId) {
          setSelectedUserId(null);
          setUserForm(null);
        }
      },
    });
  }

  function handleDeleteFeedback(feedbackId: string) {
    if (!window.confirm('Delete this feedback item? This action cannot be undone.')) {
      return;
    }

    deleteFeedback.mutate(feedbackId, {
      onSuccess: () => {
        if (selectedFeedbackId === feedbackId) {
          setSelectedFeedbackId(null);
        }
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {isCreateSection ? (
        <Card>
          <CardContent className="px-5 py-6 sm:px-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldIcon className="size-4 text-primary" />
              Create admin account
            </h2>
            <form className="space-y-5" onSubmit={handleCreateAdmin} noValidate>
              <AuthFormError
                message={
                  createAdmin.error
                    ? getApiErrorMessage(createAdmin.error, 'Could not create the admin account.')
                    : ''
                }
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                  label="First name"
                  name="adminFirstName"
                  required
                  value={createAdminForm.firstName}
                  error={createAdminErrors.firstName}
                  icon={<UserIcon className="size-4" />}
                  onChange={(event) => updateCreateAdminField('firstName', event.target.value)}
                />
                <AuthField
                  label="Last name"
                  name="adminLastName"
                  required
                  value={createAdminForm.lastName}
                  error={createAdminErrors.lastName}
                  icon={<UserIcon className="size-4" />}
                  onChange={(event) => updateCreateAdminField('lastName', event.target.value)}
                />
              </div>
              <AuthField
                label="Username"
                name="adminUserName"
                required
                value={createAdminForm.userName}
                error={createAdminErrors.userName}
                icon={<AtSignIcon className="size-4" />}
                onChange={(event) => updateCreateAdminField('userName', event.target.value)}
              />
              <AuthField
                label="Email"
                name="adminEmail"
                required
                type="email"
                value={createAdminForm.email}
                error={createAdminErrors.email}
                icon={<MailIcon className="size-4" />}
                onChange={(event) => updateCreateAdminField('email', event.target.value)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthPasswordField
                  label="Password"
                  name="adminPassword"
                  required
                  value={createAdminForm.password}
                  error={createAdminErrors.password}
                  onChange={(event) => updateCreateAdminField('password', event.target.value)}
                />
                <AuthPasswordField
                  label="Confirm password"
                  name="adminConfirmPassword"
                  required
                  value={createAdminForm.confirmPassword}
                  error={createAdminErrors.confirmPassword}
                  onChange={(event) =>
                    updateCreateAdminField('confirmPassword', event.target.value)
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthField
                  label="Phone number"
                  name="adminPhone"
                  required
                  type="tel"
                  inputMode="numeric"
                  value={createAdminForm.phoneNumber}
                  error={createAdminErrors.phoneNumber}
                  icon={<PhoneIcon className="size-4" />}
                  onChange={(event) => updateCreateAdminField('phoneNumber', event.target.value)}
                />
                <AuthField
                  label="Date of birth"
                  name="adminDob"
                  required
                  type="date"
                  value={createAdminForm.dob}
                  error={createAdminErrors.dob}
                  icon={<CalendarDaysIcon className="size-4" />}
                  onChange={(event) => updateCreateAdminField('dob', event.target.value)}
                />
              </div>
              <AuthField
                label="Bio"
                name="adminBio"
                hint="Optional. 2 to 250 characters."
                value={createAdminForm.bio}
                error={createAdminErrors.bio}
              >
                <div className="relative">
                  <span className="pointer-events-none absolute top-2.5 left-2.5 inline-flex items-center text-muted-foreground">
                    <FileTextIcon className="size-4" />
                  </span>
                  <Textarea
                    id="adminBio"
                    name="adminBio"
                    rows={3}
                    value={createAdminForm.bio}
                    aria-invalid={createAdminErrors.bio ? true : undefined}
                    className="pl-8"
                    onChange={(event) => updateCreateAdminField('bio', event.target.value)}
                  />
                </div>
              </AuthField>
              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={createAdmin.isPending}>
                  <UserPlusIcon className="size-4" />
                  {createAdmin.isPending ? 'Creating admin…' : 'Create admin'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}

      {isUsersSection ? (
        <Card>
          <CardContent className="px-5 py-6 sm:px-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <UsersIcon className="size-4 text-primary" />
              User management
            </h2>
            <AuthFormError
              message={
                usersLoadError ||
                userLoadError ||
                userFormError ||
                (updateUser.error
                  ? getApiErrorMessage(updateUser.error, 'Could not update this user right now.')
                  : '') ||
                (deleteUser.error
                  ? getApiErrorMessage(deleteUser.error, 'Could not delete this user right now.')
                  : '')
              }
            />
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="rounded-lg border border-border">
                <div className="border-b border-border px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  All users
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {users.isLoading ? (
                    <p className="px-2 py-2 text-sm text-muted-foreground">Loading users…</p>
                  ) : null}
                  {!users.isLoading && (users.data?.length ?? 0) === 0 ? (
                    <p className="px-2 py-2 text-sm text-muted-foreground">No users found.</p>
                  ) : null}
                  <ul className="space-y-1">
                    {users.data?.map((user) => (
                      <li key={user.id}>
                        <button
                          type="button"
                          className={cn(
                            'w-full rounded-md px-2.5 py-2 text-left transition-colors',
                            selectedUserId === user.id
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted',
                          )}
                          onClick={() => setSelectedUserId(user.id)}
                        >
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p
                            className={cn(
                              'text-xs break-all',
                              selectedUserId === user.id
                                ? 'text-primary/80'
                                : 'text-muted-foreground',
                            )}
                          >
                            {user.email}
                          </p>
                          <p
                            className={cn(
                              'mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px]',
                              user.role === 'admin'
                                ? 'bg-primary/15 text-primary'
                                : 'bg-muted text-muted-foreground',
                            )}
                          >
                            {user.role}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                {selectedUser.isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading user details…</p>
                ) : null}
                {!selectedUser.isLoading && !selectedUser.data ? (
                  <p className="text-sm text-muted-foreground">Select a user to review and edit.</p>
                ) : null}
                {!selectedUser.isLoading && selectedUser.data && userForm ? (
                  <form className="space-y-4" onSubmit={handleUpdateUser} noValidate>
                    <div className="mb-1">
                      <p className="text-sm font-medium text-foreground">{selectedUserName}</p>
                      <p className="text-xs break-all text-muted-foreground">
                        {selectedUser.data.email}
                      </p>
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
                    <AuthField
                      label="Role"
                      name="editUserRole"
                      required
                      error={userFormErrors.role}
                    >
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
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button type="submit" size="sm" disabled={updateUser.isPending}>
                        {updateUser.isPending ? 'Updating…' : 'Update user'}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={deleteUser.isPending}
                        onClick={() => handleDeleteUser(selectedUser.data.id)}
                      >
                        <Trash2Icon className="size-3.5" />
                        Delete user
                      </Button>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {isFeedbackSection ? (
        <Card>
          <CardContent className="px-5 py-6 sm:px-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
              <MessageSquareTextIcon className="size-4 text-primary" />
              Feedback moderation
            </h2>
            <AuthFormError
              message={
                feedbackLoadError ||
                selectedFeedbackLoadError ||
                (deleteFeedback.error
                  ? getApiErrorMessage(
                      deleteFeedback.error,
                      'Could not delete this feedback right now.',
                    )
                  : '')
              }
            />
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <div className="rounded-lg border border-border">
                <div className="border-b border-border px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  All feedback
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {feedbacks.isLoading ? (
                    <p className="px-2 py-2 text-sm text-muted-foreground">Loading feedback…</p>
                  ) : null}
                  {!feedbacks.isLoading && (feedbacks.data?.length ?? 0) === 0 ? (
                    <p className="px-2 py-2 text-sm text-muted-foreground">No feedback found.</p>
                  ) : null}
                  <ul className="space-y-1">
                    {feedbacks.data?.map((feedback) => (
                      <li key={feedback.id}>
                        <button
                          type="button"
                          className={cn(
                            'w-full rounded-md px-2.5 py-2 text-left transition-colors',
                            selectedFeedbackId === feedback.id
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-muted',
                          )}
                          onClick={() => setSelectedFeedbackId(feedback.id)}
                        >
                          <p className="text-sm font-medium">{feedback.title}</p>
                          <p
                            className={cn(
                              'mt-1 text-xs',
                              selectedFeedbackId === feedback.id
                                ? 'text-primary/80'
                                : 'text-muted-foreground',
                            )}
                          >
                            {formatDateTime(feedback.createdAt)}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                {selectedFeedback.isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading feedback details…</p>
                ) : null}
                {!selectedFeedback.isLoading && !selectedFeedback.data ? (
                  <p className="text-sm text-muted-foreground">
                    Select a feedback item to see complete details.
                  </p>
                ) : null}
                {!selectedFeedback.isLoading && selectedFeedback.data ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">
                      {selectedFeedback.data.title}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedFeedback.data.description || 'No description'}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>User id: {selectedFeedback.data.user}</p>
                      <p>Created: {formatDateTime(selectedFeedback.data.createdAt)}</p>
                      <p>Updated: {formatDateTime(selectedFeedback.data.updatedAt)}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={deleteFeedback.isPending}
                        onClick={() => handleDeleteFeedback(selectedFeedback.data.id)}
                      >
                        <Trash2Icon className="size-3.5" />
                        Delete feedback
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
