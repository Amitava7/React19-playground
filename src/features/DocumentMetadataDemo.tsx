import { useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

type PageName = 'Home' | 'About' | 'Contact'

const pages: PageName[] = ['Home', 'About', 'Contact']

export default function DocumentMetadataDemo() {
  const [page, setPage] = useState<PageName>('Home')

  return (
    <>
      <title>{`${page} Page`}</title>
      <meta name="description" content={`This is the ${page} page.`} />

      <DemoWrapper
        title="Document Metadata"
        description="React 19 hoists <title> and <meta> to <head> automatically. Watch the browser tab title change."
      >
        <p>Current page: <strong>{page}</strong></p>
        <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Check the browser tab, the title updates!</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {pages.map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{ fontWeight: page === p ? 'bold' : 'normal' }}
            >
              {p}
            </button>
          ))}
        </div>
      </DemoWrapper>
    </>
  )
}
