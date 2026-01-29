import { createFileRoute } from '@tanstack/react-router';
import { EditarPresente } from '../../../pages/Presentes/screens/EditarPresente';

export const Route = createFileRoute('/_auth/presentes/$presenteId/editar')({
    component: RouteComponent,
});

function RouteComponent() {
    const { presenteId } = Route.useParams();
    return <EditarPresente presenteId={presenteId} />;
}
