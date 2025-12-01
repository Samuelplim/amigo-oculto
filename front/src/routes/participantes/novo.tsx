import { createFileRoute } from '@tanstack/react-router';
import { NovoParticipante } from '../../pages/Participantes/screens/NovoParticipante';

export const Route = createFileRoute('/participantes/novo')({
    component: RouteComponent,
});

function RouteComponent() {
    return <NovoParticipante />;
}
