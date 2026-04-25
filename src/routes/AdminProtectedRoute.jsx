import { ProtectedRoute } from './ProtectedRoute';

export function AdminProtectedRoute() {
  return <ProtectedRoute adminOnly />;
}
