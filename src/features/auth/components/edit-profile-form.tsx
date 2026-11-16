import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { useUpdateProfile } from '@/features/auth/hooks/use-update-profile';
import type { AuthUser } from '@/features/auth/types/auth';
import { profileChanges, validateProfile, type ProfileFormInput } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

type EditProfileFormProps = {
  user: AuthUser;
  onCancel: () => void;
  onSaved: () => void;
};

function formFromUser(user: AuthUser): ProfileFormInput {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    phoneNumber: user.phoneNumber ?? '',
    dob: user.dob?.slice(0, 10) ?? '',
    bio: user.bio ?? '',
  };
}

export function EditProfileForm({ user, onCancel, onSaved }: EditProfileFormProps) {
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState<ProfileFormInput>(() => formFromUser(user));
  const [errors, setErrors] = useState<ReturnType<typeof validateProfile>>({});
  const [formError, setFormError] = useState('');

  function updateField(field: keyof ProfileFormInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateProfile(form, user);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormError('');
      updateProfile.reset();
      return;
    }

    const changes = profileChanges(form, user);
    if (Object.keys(changes).length === 0) {
      setFormError('Change at least one field before saving.');
      updateProfile.reset();
      return;
    }

    setFormError('');
    updateProfile.mutate(changes, {
      onSuccess: () => {
        onSaved();
      },
    });
  }

  return (
    <form className="space-y-4 py-4" onSubmit={handleSubmit} noValidate>
      <AuthFormError
        message={
          formError ||
          (updateProfile.error
            ? getApiErrorMessage(updateProfile.error, 'Could not update your profile. Try again.')
            : '')
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(event) => updateField('firstName', event.target.value)}
        />
        <AuthField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(event) => updateField('lastName', event.target.value)}
        />
      </div>
      <AuthField
        label="Username"
        name="userName"
        autoComplete="username"
        value={form.userName}
        error={errors.userName}
        onChange={(event) => updateField('userName', event.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="Phone number"
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="9876543210"
          value={form.phoneNumber}
          error={errors.phoneNumber}
          onChange={(event) => updateField('phoneNumber', event.target.value)}
        />
        <AuthField
          label="Date of birth"
          name="dob"
          type="date"
          autoComplete="bday"
          value={form.dob}
          error={errors.dob}
          onChange={(event) => updateField('dob', event.target.value)}
        />
      </div>
      <AuthField
        label="Bio"
        name="bio"
        hint="Optional. 2 to 250 characters."
        value={form.bio}
        error={errors.bio}
        onChange={(event) => updateField('bio', event.target.value)}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" size="lg" onClick={onCancel} disabled={updateProfile.isPending}>
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={updateProfile.isPending}>
          {updateProfile.isPending ? 'Saving…' : 'Save profile'}
        </Button>
      </div>
    </form>
  );
}
