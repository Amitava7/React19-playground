import { useState, useTransition } from 'react'
import DemoWrapper from '../components/DemoWrapper'
import { fakeRequest } from '../fakeserver'

interface Employee {
  id: number
  label: string
  dept: string
}

const DEPTS = ['Engineering', 'Design', 'Marketing', 'Sales'] as const
type Filter = 'All' | typeof DEPTS[number]

const LARGE_LIST: Employee[] = Array.from({ length: 2000 }, (_, i) => ({
  id: i,
  label: `User ${i + 1}`,
  dept: DEPTS[i % 4],
}))

export default function StartTransitionDemo() {
  const [filter, setFilter] = useState<Filter>('All')
  const [results, setResults] = useState<Employee[]>(LARGE_LIST)
  const [isPending, startTransition] = useTransition()

  function applyFilter(dept: Filter): void {
    setFilter(dept)
    startTransition(async () => {
      const data = await fakeRequest<Employee[]>(
        dept === 'All' ? LARGE_LIST : LARGE_LIST.filter(u => u.dept === dept),
        { ms: 800 }
      )
      setResults(data)
    })
  }

  const filters: Filter[] = ['All', ...DEPTS]

  return (
    <DemoWrapper
      title="startTransition with async"
      description="React 19 allows async functions inside startTransition. isPending stays true until the async work finishes."
    >
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {filters.map(dept => (
          <button
            key={dept}
            onClick={() => applyFilter(dept)}
            style={{ fontWeight: filter === dept ? 'bold' : 'normal' }}
          >
            {dept}
          </button>
        ))}
      </div>

      {isPending ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading {filter}...</p>
      ) : (
        <p>Showing {results.length} users</p>
      )}

      <ul style={{
        height: '200px',
        overflowY: 'auto',
        fontSize: '0.85rem',
        listStyle: 'none',
        padding: 0,
        opacity: isPending ? 0.5 : 1,
        transition: 'opacity 0.2s',
      }}>
        {results.slice(0, 20).map(u => (
          <li key={u.id} style={{ padding: '0.15rem 0' }}>{u.label} - {u.dept}</li>
        ))}
        <li style={{ color: 'var(--text-muted)' }}>...and {results.length - 20} more</li>
      </ul>
    </DemoWrapper>
  )
}
