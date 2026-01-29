import { createFileRoute } from '@tanstack/react-router';
import { NovoParticipante } from '../../pages/Participantes/screens/NovoParticipante';

export const Route = createFileRoute('/_auth/participantes/novo')({
    component: RouteComponent,
});

function RouteComponent() {
    return <NovoParticipante />;
}
