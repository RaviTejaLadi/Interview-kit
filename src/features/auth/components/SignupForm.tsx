import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  AtSignIcon,
  CalendarDaysIcon,
  FileTextIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AuthField, AuthFormError } from '@/features/auth/components/AuthField';
import { AuthFormHeading } from '@/features/auth/components/AuthFormHeading';
import { AuthPasswordField } from '@/features/auth/components/AuthPasswordField';
import { OAuthButtons } from '@/features/auth/components/OauthButtons';
import { useRegister } from '@/features/auth/hooks/use-register';
import { paths } from '@/routes/paths';
import { validateRegister } from '@/features/auth/utils/validation';
import { getApiErrorMessage } from '@/utils/axios';

const emptyErrors: ReturnType<typeof validateRegister> = {};

export function SignUpForm() {
  const register = useRegister();
  const navigate = useNavigate();
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
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <AuthFormHeading
        icon={UserPlusIcon}
        title="Create account"
        description="Register with email, or continue with Google or GitHub. You will be signed in after the account is created."
      />
      <OAuthButtons />
      <AuthFormError
        message={
          register.error
            ? getApiErrorMessage(register.error, 'Could not create the account. Try again.')
            : ''
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthField
          label="First name"
          name="firstName"
          required
          autoComplete="given-name"
          value={firstName}
          error={errors.firstName}
          icon={<UserIcon className="size-4" />}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <AuthField
          label="Last name"
          name="lastName"
          required
          autoComplete="family-name"
          value={lastName}
          error={errors.lastName}
          icon={<UserIcon className="size-4" />}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <AuthField
        label="Username"
        name="userName"
        required
        autoComplete="username"
        value={userName}
        error={errors.userName}
        icon={<AtSignIcon className="size-4" />}
        onChange={(event) => setUserName(event.target.value)}
      />
      <AuthField
        label="Email"
        name="email"
        required
        type="email"
        autoComplete="email"
        value={email}
        error={errors.email}
        icon={<MailIcon className="size-4" />}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthPasswordField
          label="Password"
          name="password"
          required
          autoComplete="new-password"
          value={password}
          error={errors.password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthPasswordField
          label="Confirm password"
          name="confirmPassword"
          required
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
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="9876543210"
          value={phoneNumber}
          error={errors.phoneNumber}
          icon={<PhoneIcon className="size-4" />}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <AuthField
          label="Date of birth"
          name="dob"
          required
          type="date"
          autoComplete="bday"
          value={dob}
          error={errors.dob}
          icon={<CalendarDaysIcon className="size-4" />}
          onChange={(event) => setDob(event.target.value)}
        />
      </div>
      <AuthField label="Bio" name="bio" hint="2 to 250 characters." value={bio} error={errors.bio}>
        <div className="relative">
          <span className="pointer-events-none absolute top-2.5 left-2.5 inline-flex items-center text-muted-foreground">
            <FileTextIcon className="size-4" />
          </span>
          <Textarea
            id="bio"
            name="bio"
            rows={3}
            value={bio}
            aria-invalid={errors.bio ? true : undefined}
            className="pl-8"
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
      </AuthField>
      <Button type="submit" size="sm" className="w-full" disabled={register.isPending}>
        <UserPlusIcon className="size-4" />
        {register.isPending ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Button type="button" variant="link" size="sm" onClick={() => navigate(paths.login)}>
          Sign in
        </Button>
      </p>
    </form>
  );
}
