import { createFileRoute } from '@tanstack/react-router';
import { Vault } from '@/pages/vault';

export const Route = createFileRoute('/vault')({
  component: Vault,
});
