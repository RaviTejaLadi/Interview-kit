import { z } from 'zod';

import type { AdminRole } from '@/features/admin/types/admin';
import { AUTH_FIELD_LIMITS, PHONE_PATTERN } from '@/features/auth/constants/auth.constants';
import { firstFieldError, toFieldErrors, type FieldErrors } from '@/lib/zod-field-errors';

export type AdminUserEditInput = {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  dob: string;
  bio: string;
  role: AdminRole;
};

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const adminUserEditSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      AUTH_FIELD_LIMITS.nameMin,
      `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`,
    )
    .max(
      AUTH_FIELD_LIMITS.nameMax,
      `First name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`,
    ),
  lastName: z
    .string()
    .trim()
    .min(
      AUTH_FIELD_LIMITS.nameMin,
      `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`,
    )
    .max(
      AUTH_FIELD_LIMITS.nameMax,
      `Last name must be ${AUTH_FIELD_LIMITS.nameMin} to ${AUTH_FIELD_LIMITS.nameMax} characters.`,
    ),
  userName: z
    .string()
    .trim()
    .min(
      AUTH_FIELD_LIMITS.userNameMin,
      `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`,
    )
    .max(
      AUTH_FIELD_LIMITS.userNameMax,
      `Username must be ${AUTH_FIELD_LIMITS.userNameMin} to ${AUTH_FIELD_LIMITS.userNameMax} characters.`,
    ),
  phoneNumber: z
    .string()
    .trim()
    .regex(PHONE_PATTERN, 'Enter a 10-digit phone number starting with 6, 7, 8, or 9.'),
  dob: z.string().trim().refine(isValidDate, 'Enter a valid date of birth.'),
  bio: z
    .string()
    .trim()
    .min(
      AUTH_FIELD_LIMITS.bioMin,
      `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`,
    )
    .max(
      AUTH_FIELD_LIMITS.bioMax,
      `Bio must be ${AUTH_FIELD_LIMITS.bioMin} to ${AUTH_FIELD_LIMITS.bioMax} characters.`,
    ),
  role: z.enum(['user', 'admin'], {
    errorMap: () => ({ message: 'Select a valid role.' }),
  }),
});

export function validateAdminUserEdit(
  input: AdminUserEditInput,
): FieldErrors<keyof AdminUserEditInput> {
  const result = adminUserEditSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, [
    'firstName',
    'lastName',
    'userName',
    'phoneNumber',
    'dob',
    'bio',
    'role',
  ]);
}

export function adminUserEditErrorMessage(input: AdminUserEditInput): string {
  const result = adminUserEditSchema.safeParse(input);
  if (result.success) {
    return '';
  }
  return firstFieldError(result.error);
}
