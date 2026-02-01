import { createFileRoute } from '@tanstack/react-router';
import { SalesPage } from '../pages/SalesPage';
import { useAuth } from '../components/provider/auth-provider';
import { Home } from '../pages/Home';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Home /> : <SalesPage />;
}
