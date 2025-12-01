import { createFileRoute } from '@tanstack/react-router';
import { Participantes } from '../../pages/Participantes';

export const Route = createFileRoute('/participantes/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Participantes />;
}
