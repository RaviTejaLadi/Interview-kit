import { z } from 'zod';

import { CHAT_MESSAGE_FALLBACK_MAX } from '@/features/chat/constants/chat.constants';
import { toFieldErrors, type FieldErrors } from '@/lib/zod-field-errors';

export function validateChatMessage(
  message: string,
  maxCharacters = CHAT_MESSAGE_FALLBACK_MAX,
): FieldErrors<'message'> {
  const schema = z.object({
    message: z
      .string()
      .trim()
      .min(1, 'Message is required.')
      .max(maxCharacters, `Message cannot exceed ${maxCharacters} characters.`),
  });

  const result = schema.safeParse({ message });
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['message']);
}
