import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/participantes')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/participantes"!</div>;
}
