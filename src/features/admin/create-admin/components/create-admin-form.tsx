import { useState, type FormEvent } from 'react';
import {
  AtSignIcon,
  CalendarDaysIcon,
  FileTextIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCreateAdmin } from '@/features/admin/create-admin/hooks/use-create-admin';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { AuthPasswordField } from '@/features/auth/components/auth-password-field';
import { validateRegister } from '@/features/auth/utils/validation';
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

export function CreateAdminForm() {
  const createAdmin = useCreateAdmin();
  const [createAdminForm, setCreateAdminForm] =
    useState<CreateAdminFormState>(emptyCreateAdminForm);
  const [createAdminErrors, setCreateAdminErrors] = useState<ReturnType<typeof validateRegister>>(
    Object.create(null),
  );

  function updateCreateAdminField(field: keyof CreateAdminFormState, value: string) {
    setCreateAdminForm((current) => ({ ...current, [field]: value }));
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

  return (
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
              onChange={(event) => updateCreateAdminField('confirmPassword', event.target.value)}
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
            <Button type="submit" size="sm" disabled={createAdmin.isPending}>
              <UserPlusIcon className="size-4" />
              {createAdmin.isPending ? 'Creating admin…' : 'Create admin'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
