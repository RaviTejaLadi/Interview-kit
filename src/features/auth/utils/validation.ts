import {
  AUTH_FIELD_LIMITS,
  EMAIL_PATTERN,
  PHONE_PATTERN,
} from '@/features/auth/constants/auth.constants';
import type { AuthUser, LoginInput, RegisterInput, UpdateProfileInput } from '@/features/auth/types/auth';
import { z } from 'zod';

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validateLogin(input: LoginInput): FieldErrors<'email' | 'password'> {
  const result = loginSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['email', 'password']);
}

export function validateRegister(
  input: RegisterInput & { confirmPassword: string },
): FieldErrors<keyof RegisterInput | 'confirmPassword'> {
  const result = registerSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, [
    'firstName',
    'lastName',
    'userName',
    'email',
    'password',
    'confirmPassword',
    'phoneNumber',
    'dob',
    'bio',
  ]);
}

export function validateForgotPassword(email: string): FieldErrors<'email'> {
  const result = forgotPasswordSchema.safeParse({ email });
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['email']);
}

export function validateOtp(otp: string): FieldErrors<'otp'> {
  const result = otpSchema.safeParse({ otp });
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['otp']);
}

export function validateResetPassword(input: {
  newPassword: string;
  confirmPassword: string;
}): FieldErrors<'newPassword' | 'confirmPassword'> {
  const result = resetPasswordSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['newPassword', 'confirmPassword']);
}

export function validateChangePassword(input: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}): FieldErrors<'currentPassword' | 'newPassword' | 'confirmPassword'> {
  const result = changePasswordSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['currentPassword', 'newPassword', 'confirmPassword']);
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
  const result = profileSchema.safeParse(input);
  const errors = result.success
    ? ({} as FieldErrors<keyof ProfileFormInput>)
    : toFieldErrors(result.error, ['firstName', 'lastName', 'userName', 'phoneNumber', 'dob', 'bio']);

  const phoneNumber = input.phoneNumber.trim();
  const dob = input.dob.trim();
  const bio = input.bio.trim();

  if (current.phoneNumber && !phoneNumber) {
    errors.phoneNumber = 'Phone number is required.';
  }

  if (current.dob && !dob) {
    errors.dob = 'Date of birth is required.';
  }

  if (current.bio && !bio) {
    errors.bio = `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`;
  }

  return errors;
}

const firstNameSchema = z
  .string()
  .trim()
  .min(AUTH_FIELD_LIMITS.nameMin, `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`)
  .max(AUTH_FIELD_LIMITS.nameMax, `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`);

const lastNameSchema = z
  .string()
  .trim()
  .min(AUTH_FIELD_LIMITS.nameMin, `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`)
  .max(AUTH_FIELD_LIMITS.nameMax, `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`);

const userNameSchema = z
  .string()
  .trim()
  .min(AUTH_FIELD_LIMITS.userNameMin, `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`)
  .max(AUTH_FIELD_LIMITS.userNameMax, `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`);

const emailSchema = z.string().trim().regex(EMAIL_PATTERN, 'Enter a valid email address.');

const passwordSchema = z
  .string()
  .min(AUTH_FIELD_LIMITS.passwordMin, `Password must be ${AUTH_FIELD_LIMITS.passwordMin} to ${AUTH_FIELD_LIMITS.passwordMax} characters.`)
  .max(AUTH_FIELD_LIMITS.passwordMax, `Password must be ${AUTH_FIELD_LIMITS.passwordMin} to ${AUTH_FIELD_LIMITS.passwordMax} characters.`);

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
});

const registerSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    userName: userNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
    phoneNumber: z.string().trim().regex(PHONE_PATTERN, 'Enter a 10-digit phone number starting with 6, 7, 8, or 9.'),
    dob: z.string().trim().refine(isValidDate, 'Enter a valid date of birth.'),
    bio: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword !== value.password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
      });
    }

    if (value.bio && (value.bio.length < AUTH_FIELD_LIMITS.bioMin || value.bio.length > AUTH_FIELD_LIMITS.bioMax)) {
      ctx.addIssue({
        code: 'custom',
        path: ['bio'],
        message: `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`,
      });
    }
  });

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

const otpSchema = z.object({
  otp: z.string().trim().regex(/^\d{6}$/, 'Enter the 6-digit code from your email.'),
});

const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword !== value.newPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
      });
    }
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required.'),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword === value.currentPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: 'New password must be different from the current password.',
      });
    }

    if (value.confirmPassword !== value.newPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
      });
    }
  });

const profileSchema = z
  .object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    userName: userNameSchema,
    phoneNumber: z.string().trim(),
    dob: z.string().trim(),
    bio: z.string().trim(),
  })
  .superRefine((value, ctx) => {
    if (value.phoneNumber && !PHONE_PATTERN.test(value.phoneNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phoneNumber'],
        message: 'Enter a 10-digit phone number starting with 6, 7, 8, or 9.',
      });
    }

    if (value.dob && !isValidDate(value.dob)) {
      ctx.addIssue({
        code: 'custom',
        path: ['dob'],
        message: 'Enter a valid date of birth.',
      });
    }

    if (value.bio && (value.bio.length < AUTH_FIELD_LIMITS.bioMin || value.bio.length > AUTH_FIELD_LIMITS.bioMax)) {
      ctx.addIssue({
        code: 'custom',
        path: ['bio'],
        message: `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`,
      });
    }
  });

function toFieldErrors<T extends string>(error: z.ZodError, fields: readonly T[]): FieldErrors<T> {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const mapped: FieldErrors<T> = {};

  for (const field of fields) {
    const message = flattened[field]?.[0];
    if (message) {
      mapped[field] = message;
    }
  }

  return mapped;
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
