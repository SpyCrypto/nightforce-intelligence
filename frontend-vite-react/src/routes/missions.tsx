import { createFileRoute } from '@tanstack/react-router';
import { Missions } from '@/pages/missions';

export const Route = createFileRoute('/missions')({
  component: Missions,
});
