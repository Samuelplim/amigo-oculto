import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SessionProvider } from '../components/provider/session-provider';

const RootLayout = () => (
    <>
        <SessionProvider>
            <Navbar />
            <Outlet />
            <Footer />
            <TanStackRouterDevtools />
        </SessionProvider>
    </>
);

export const Route = createRootRoute({ component: RootLayout });
