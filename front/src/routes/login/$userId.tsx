import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../../pages/Login';

export const Route = createFileRoute('/login/$userId')({
    component: RouteComponent,
});
function RouteComponent() {
    const { userId } = Route.useParams();
    return <LoginPage userId={userId} />;
}
