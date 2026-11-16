import {
  AUTH_FIELD_LIMITS,
  EMAIL_PATTERN,
  PHONE_PATTERN,
} from '@/features/auth/constants/auth.constants';
import type { LoginInput, RegisterInput } from '@/features/auth/types/auth';

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
