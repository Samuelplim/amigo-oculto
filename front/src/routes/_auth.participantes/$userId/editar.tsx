import { createFileRoute } from '@tanstack/react-router';
import { EditarParticipante } from '../../../pages/Participantes/screens/EditarParticipante';

export const Route = createFileRoute('/_auth/participantes/$userId/editar')({
    component: RouteComponent,
});

function RouteComponent() {
    const { userId } = Route.useParams();
    return <EditarParticipante userId={userId} />;
}
