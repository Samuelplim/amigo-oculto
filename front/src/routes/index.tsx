import { createFileRoute, redirect } from '@tanstack/react-router';
import { Home } from '../pages/Home';

export const Route = createFileRoute('/')({
    beforeLoad: ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
        }
    },
    component: Index,
});

function Index() {
    return <Home />;
}
