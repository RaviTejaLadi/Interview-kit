import { MessageSquarePlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type FeedbackHeaderControlsProps = {
  onAdd: () => void;
};

export function FeedbackHeaderControls({ onAdd }: FeedbackHeaderControlsProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Button type="button" size="sm" onClick={onAdd}>
        <MessageSquarePlusIcon className="size-4" />
        Add feedback
      </Button>
    </div>
  );
}
