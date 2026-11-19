import { redirect, type LoaderFunctionArgs } from 'react-router';

import { interviewCatalog } from '@/features/interview-app/catalog';
import { paths } from '@/routes/paths';

export function kitLoader({ params }: LoaderFunctionArgs) {
  const kitId = params.kitId ?? '';
  const exists = interviewCatalog.groups.some((group) => group.id === kitId);
  if (!exists) {
    return redirect(paths.kits);
  }

  return null;
}

export function guideLoader({ params }: LoaderFunctionArgs) {
  const guideId = params.guideId ?? '';
  const exists = interviewCatalog.allGuides.some((guide) => guide.id === guideId);
  if (!exists) {
    return redirect(paths.guides);
  }

  return null;
}
