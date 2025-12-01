import { createFileRoute } from '@tanstack/react-router';
import { Presentes } from '../../pages/Presentes';

export const Route = createFileRoute('/presentes/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Presentes />;
}
