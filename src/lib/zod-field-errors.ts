import type { z } from 'zod';

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function toFieldErrors<T extends string>(
  error: z.ZodError,
  fields: readonly T[],
): FieldErrors<T> {
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

export function firstFieldError(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Please check the form and try again.';
}
