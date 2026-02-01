import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/registrar')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/registrar"!</div>;
}
