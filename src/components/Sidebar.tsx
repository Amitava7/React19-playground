import { NavLink } from 'react-router-dom'

interface NavItem {
    path: string
    label: string
}

const links: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/use-action-state', label: '01 · useActionState' },
    { path: '/use-form-status', label: '02 · useFormStatus' },
    { path: '/use-optimistic', label: '03 · useOptimistic' },
    { path: '/use-hook', label: '04 · use() hook' },
    { path: '/ref-as-prop', label: '05 · ref as prop' },
    { path: '/ref-cleanup', label: '06 · ref cleanup' },
    { path: '/context-as-provider', label: '07 · Context as Provider' },
    { path: '/use-deferred-value', label: '08 · useDeferredValue' },
    { path: '/document-metadata', label: '09 · Document Metadata' },
    { path: '/asset-loading', label: '10 · Asset Loading' },
    { path: '/error-handling', label: '11 · Error Handling' },
    { path: '/start-transition', label: '12 · startTransition async' },
    { path: '/custom-elements', label: '13 · Custom Elements' },
]

export default function Sidebar() {
    return (
        <nav className="sidebar">
            <div className="sidebar-title">React 19</div>
            {links.map(({ path, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
                >
                    {label}
                </NavLink>
            ))}
        </nav>
    )
}
