import { createFileRoute } from '@tanstack/react-router';
import { Reputation } from '@/pages/reputation';

export const Route = createFileRoute('/reputation')({
  component: Reputation,
});
