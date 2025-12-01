import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/presentes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/presentes"!</div>
}
