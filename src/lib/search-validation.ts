import { z } from 'zod';

export const SEARCH_QUERY_MAX = 120;

const searchQuerySchema = z.string().max(SEARCH_QUERY_MAX);

export function sanitizeSearchQuery(value: string): string {
  const result = searchQuerySchema.safeParse(value);
  if (result.success) {
    return result.data;
  }
  return value.slice(0, SEARCH_QUERY_MAX);
}
