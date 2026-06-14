import { createFileRoute } from '@tanstack/react-router';
import { SpyChat } from '@/pages/spy';

export const Route = createFileRoute('/spy')({
  component: SpyChat,
});
