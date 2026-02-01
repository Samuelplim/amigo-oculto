import { createFileRoute } from '@tanstack/react-router';
import { EventoPage } from '../pages/Evento';

export const Route = createFileRoute('/_auth/evento')({
    component: RouteComponent,
});

function RouteComponent() {
    return <EventoPage />;
}
