import { lazy, type ComponentType } from 'react'

interface DemoRoute {
  path: string
  Demo: ComponentType
}

export const Demos: DemoRoute[] = [
  { path: '/use-action-state',    Demo: lazy(() => import('./features/UseActionStateDemo')) },
  { path: '/use-form-status',     Demo: lazy(() => import('./features/UseFormStatus')) },
  { path: '/use-optimistic',      Demo: lazy(() => import('./features/UseOptimistic')) },
  { path: '/use-hook',            Demo: lazy(() => import('./features/UseDemo')) },
  { path: '/ref-as-prop',         Demo: lazy(() => import('./features/RefAsPropDemo')) },
  { path: '/ref-cleanup',         Demo: lazy(() => import('./features/RefCleanupDemo')) },
  { path: '/context-as-provider', Demo: lazy(() => import('./features/ContextAsProviderDemo')) },
  { path: '/use-deferred-value',  Demo: lazy(() => import('./features/UseDeferredValueDemo')) },
  { path: '/document-metadata',   Demo: lazy(() => import('./features/DocumentMetadataDemo')) },
  { path: '/asset-loading',       Demo: lazy(() => import('./features/AssetLoadingDemo')) },
  { path: '/error-handling',      Demo: lazy(() => import('./features/ErrorHandlingDemo')) },
  { path: '/start-transition',    Demo: lazy(() => import('./features/StartTransitionDemo')) },
  { path: '/custom-elements',     Demo: lazy(() => import('./features/CustomElementsDemo')) },
]
