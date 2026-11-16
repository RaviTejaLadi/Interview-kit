import {
  AUTH_FIELD_LIMITS,
  EMAIL_PATTERN,
  PHONE_PATTERN,
} from '@/features/auth/constants/auth.constants';
import type { AuthUser, LoginInput, RegisterInput, UpdateProfileInput } from '@/features/auth/types/auth';

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateLogin(input: LoginInput): FieldErrors<'email' | 'password'> {
  const errors: FieldErrors<'email' | 'password'> = {};

  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!input.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export function validateRegister(
  input: RegisterInput & { confirmPassword: string },
): FieldErrors<keyof RegisterInput | 'confirmPassword'> {
  const errors: FieldErrors<keyof RegisterInput | 'confirmPassword'> = {};
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const userName = input.userName.trim();
  const bio = input.bio?.trim() ?? '';

  if (firstName.length < AUTH_FIELD_LIMITS.nameMin || firstName.length > AUTH_FIELD_LIMITS.nameMax) {
    errors.firstName = `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`;
  }

  if (lastName.length < AUTH_FIELD_LIMITS.nameMin || lastName.length > AUTH_FIELD_LIMITS.nameMax) {
    errors.lastName = `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`;
  }

  if (userName.length < AUTH_FIELD_LIMITS.userNameMin || userName.length > AUTH_FIELD_LIMITS.userNameMax) {
    errors.userName = `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`;
  }

  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (
    input.password.length < AUTH_FIELD_LIMITS.passwordMin ||
    input.password.length > AUTH_FIELD_LIMITS.passwordMax
  ) {
    errors.password = `Password must be ${AUTH_FIELD_LIMITS.passwordMin} to ${AUTH_FIELD_LIMITS.passwordMax} characters.`;
  }

  if (input.confirmPassword !== input.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!PHONE_PATTERN.test(input.phoneNumber.trim())) {
    errors.phoneNumber = 'Enter a 10-digit phone number starting with 6, 7, 8, or 9.';
  }

  if (!isValidDate(input.dob)) {
    errors.dob = 'Enter a valid date of birth.';
  }

  if (bio && (bio.length < AUTH_FIELD_LIMITS.bioMin || bio.length > AUTH_FIELD_LIMITS.bioMax)) {
    errors.bio = `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`;
  }

  return errors;
}

export function validateForgotPassword(email: string): FieldErrors<'email'> {
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { email: 'Enter a valid email address.' };
  }

  return {};
}

function validatePasswordLength(password: string) {
  return (
    password.length >= AUTH_FIELD_LIMITS.passwordMin && password.length <= AUTH_FIELD_LIMITS.passwordMax
  );
}

export function validateOtp(otp: string): FieldErrors<'otp'> {
  if (!/^\d{6}$/.test(otp.trim())) {
    return { otp: 'Enter the 6-digit code from your email.' };
  }

  return {};
}

export function validateResetPassword(input: {
  newPassword: string;
  confirmPassword: string;
}): FieldErrors<'newPassword' | 'confirmPassword'> {
  const errors: FieldErrors<'newPassword' | 'confirmPassword'> = {};

  if (!validatePasswordLength(input.newPassword)) {
    errors.newPassword = `Password must be ${AUTH_FIELD_LIMITS.passwordMin} to ${AUTH_FIELD_LIMITS.passwordMax} characters.`;
  }

  if (input.confirmPassword !== input.newPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function validateChangePassword(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): FieldErrors<'currentPassword' | 'newPassword' | 'confirmPassword'> {
  const errors: FieldErrors<'currentPassword' | 'newPassword' | 'confirmPassword'> = {};

  if (!input.currentPassword) {
    errors.currentPassword = 'Current password is required.';
  }

  if (!validatePasswordLength(input.newPassword)) {
    errors.newPassword = `Password must be ${AUTH_FIELD_LIMITS.passwordMin} to ${AUTH_FIELD_LIMITS.passwordMax} characters.`;
  } else if (input.newPassword === input.currentPassword) {
    errors.newPassword = 'New password must be different from the current password.';
  }

  if (input.confirmPassword !== input.newPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export type ProfileFormInput = {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  dob: string;
  bio: string;
};

export function validateProfile(
  input: ProfileFormInput,
  current: AuthUser,
): FieldErrors<keyof ProfileFormInput> {
  const errors: FieldErrors<keyof ProfileFormInput> = {};
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const userName = input.userName.trim();
  const phoneNumber = input.phoneNumber.trim();
  const bio = input.bio.trim();

  if (firstName.length < AUTH_FIELD_LIMITS.nameMin || firstName.length > AUTH_FIELD_LIMITS.nameMax) {
    errors.firstName = `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`;
  }

  if (lastName.length < AUTH_FIELD_LIMITS.nameMin || lastName.length > AUTH_FIELD_LIMITS.nameMax) {
    errors.lastName = `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`;
  }

  if (userName.length < AUTH_FIELD_LIMITS.userNameMin || userName.length > AUTH_FIELD_LIMITS.userNameMax) {
    errors.userName = `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`;
  }

  if (phoneNumber) {
    if (!PHONE_PATTERN.test(phoneNumber)) {
      errors.phoneNumber = 'Enter a 10-digit phone number starting with 6, 7, 8, or 9.';
    }
  } else if (current.phoneNumber) {
    errors.phoneNumber = 'Phone number is required.';
  }

  if (input.dob) {
    if (!isValidDate(input.dob)) {
      errors.dob = 'Enter a valid date of birth.';
    }
  } else if (current.dob) {
    errors.dob = 'Date of birth is required.';
  }

  if (bio && (bio.length < AUTH_FIELD_LIMITS.bioMin || bio.length > AUTH_FIELD_LIMITS.bioMax)) {
    errors.bio = `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`;
  } else if (!bio && current.bio) {
    errors.bio = `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`;
  }

  return errors;
}

export function profileChanges(input: ProfileFormInput, current: AuthUser): UpdateProfileInput {
  const changes: UpdateProfileInput = {};
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const userName = input.userName.trim();
  const phoneNumber = input.phoneNumber.trim();
  const bio = input.bio.trim();
  const currentDob = current.dob?.slice(0, 10) ?? '';

  if (firstName !== current.firstName) {
    changes.firstName = firstName;
  }

  if (lastName !== current.lastName) {
    changes.lastName = lastName;
  }

  if (userName !== current.userName) {
    changes.userName = userName;
  }

  if (phoneNumber && phoneNumber !== (current.phoneNumber ?? '')) {
    changes.phoneNumber = phoneNumber;
  }

  if (input.dob && input.dob !== currentDob) {
    changes.dob = input.dob;
  }

  if (bio && bio !== (current.bio ?? '')) {
    changes.bio = bio;
  }

  return changes;
}
