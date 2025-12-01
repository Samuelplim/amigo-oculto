import { createFileRoute } from '@tanstack/react-router';
import { Evento } from '../pages/Evento';

export const Route = createFileRoute('/evento')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Evento />;
}
