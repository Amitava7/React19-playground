import { useState, useDeferredValue, useMemo } from 'react'
import DemoWrapper from '../components/DemoWrapper'

const ALL_ITEMS: string[] = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

function FilteredList({ query }: { query: string }) {
  const results = useMemo(
    () => ALL_ITEMS.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 50),
    [query]
  )
  return (
    <ul style={{ height: '200px', overflowY: 'auto', fontSize: '0.85rem', listStyle: 'none', padding: 0 }}>
      {results.map(item => <li key={item} style={{ padding: '0.15rem 0' }}>{item}</li>)}
    </ul>
  )
}

export default function UseDeferredValueDemo() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query, '')
  const isStale = query !== deferredQuery

  return (
    <DemoWrapper
      title="useDeferredValue"
      description="The list updates are deferred. The input stays responsive while the 10,000-item list filters in the background."
    >
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Filter 10000 items..."
      />
      <p style={{ opacity: isStale ? 0.4 : 1, transition: 'opacity 0.2s' }}>
        {isStale ? 'Filtering...' : `Showing results for "${deferredQuery}"`}
      </p>
      <FilteredList query={deferredQuery} />
    </DemoWrapper>
  )
}
