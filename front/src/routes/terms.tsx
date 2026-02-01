import { createFileRoute } from '@tanstack/react-router';
import { TermsConditions } from '../components/policies/TermsConditions';

export const Route = createFileRoute('/terms')({
    component: RouteComponent,
});

function RouteComponent() {
    return <TermsConditions />;
}
