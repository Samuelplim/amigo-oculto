import { createFileRoute } from '@tanstack/react-router';
import { Presentes } from '../../pages/Presentes';

export const Route = createFileRoute('/_auth/presentes/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Presentes />;
}
