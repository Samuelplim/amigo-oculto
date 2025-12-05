import { createFileRoute } from '@tanstack/react-router';
import { LoginAdmin } from '../../pages/admin';

export const Route = createFileRoute('/admin/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <LoginAdmin />;
}
