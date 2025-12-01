import { createFileRoute } from '@tanstack/react-router';
import { NovoPresente } from '../../pages/Presentes/screens/NovoPresente';

export const Route = createFileRoute('/presentes/novo')({
    component: RouteComponent,
});

function RouteComponent() {
    return <NovoPresente />;
}
