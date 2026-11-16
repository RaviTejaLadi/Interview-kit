import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import { OAuthButtons } from '@/features/auth/components/oauth-buttons';
import { useRegister } from '@/features/auth/hooks/use-register';
import { useAuthStore } from '@/features/auth/hooks/use-auth-store';
import { validateRegister } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

const emptyErrors: ReturnType<typeof validateRegister> = {};

export function SignUpForm() {
  const register = useRegister();
  const setScreen = useAuthStore((state) => state.setScreen);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState(emptyErrors);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegister({
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      dob,
      bio,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      register.reset();
      return;
    }

    const trimmedBio = bio.trim();
    register.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userName: userName.trim(),
      email: email.trim(),
      password,
      phoneNumber: phoneNumber.trim(),
      dob,
      ...(trimmedBio ? { bio: trimmedBio } : {}),
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className="text-2xl text-foreground">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Register with email, or continue with Google or GitHub. You will be signed in after the account is
          created.
        </p>
      </div>
      <OAuthButtons />
      <AuthFormError
        message={
          register.error ? getApiErrorMessage(register.error, 'Could not create the account. Try again.') : ''
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="firstName"
          autoComplete="given-name"
          value={firstName}
          error={errors.firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <AuthField
          label="Last name"
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          error={errors.lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <AuthField
        label="Username"
        name="userName"
        autoComplete="username"
        value={userName}
        error={errors.userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <AuthField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          error={errors.confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="Phone number"
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="9876543210"
          value={phoneNumber}
          error={errors.phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <AuthField
          label="Date of birth"
          name="dob"
          type="date"
          autoComplete="bday"
          value={dob}
          error={errors.dob}
          onChange={(event) => setDob(event.target.value)}
        />
      </div>
      <AuthField
        label="Bio"
        name="bio"
        hint="Optional. 2 to 250 characters."
        value={bio}
        error={errors.bio}
        onChange={(event) => setBio(event.target.value)}
      />
      <Button type="submit" size="lg" className="w-full" disabled={register.isPending}>
        {register.isPending ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Button type="button" variant="link" size="sm" onClick={() => setScreen('login')}>
          Sign in
        </Button>
      </p>
    </form>
  );
}
