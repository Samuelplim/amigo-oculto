import { createFileRoute } from '@tanstack/react-router';
import { RegisterPage } from '../pages/Register';

export const Route = createFileRoute('/registrar')({
    component: RouteComponent,
});

function RouteComponent() {
    return <RegisterPage />;
}
