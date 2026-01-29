import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '../components/layout/Footer';
import { AuthContext } from '../components/provider/auth-provider';
interface MyRouterContext {
    auth: AuthContext;
}
const RootLayout = () => (
    <>
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({ component: RootLayout });
