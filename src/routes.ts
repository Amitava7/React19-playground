import { lazy, type ComponentType } from "react"

interface DemoRoute {
    path: string
    Demo: ComponentType
}
export const Demos: DemoRoute[] = [
    { path: '/use-action-state', Demo: lazy(() => import('./features/UseActionStateDemo')) },
    { path: '/use-form-status', Demo: lazy(() => import('./features/UseFormStatus')) },
    { path: '/use-optimistic', Demo: lazy(() => import('./features/UseOptimistic')) },
    { path: '/use-hook', Demo: lazy(() => import('./features/UseDemo')) },

]
