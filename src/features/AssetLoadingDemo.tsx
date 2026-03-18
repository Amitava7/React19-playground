import { useState } from 'react'
import { prefetchDNS, preload, preinit } from 'react-dom'
import DemoWrapper from '../components/DemoWrapper'

const FA_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'

export default function AssetLoadingDemo() {
  const [log, setLog] = useState<string[]>([])

  function addLog(msg: string): void {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev])
  }

  function runPrefetchDNS(): void {
    prefetchDNS('https://api.github.com')
    addLog('prefetchDNS("https://api.github.com") - DNS lookup hint sent')
  }

  function runPreload(): void {
    preload(FA_CSS, { as: 'style' })
    addLog('preload(..., { as: "style" }) - stylesheet preload hint sent')
  }

  function runPreinit(): void {
    preinit(FA_CSS, { as: 'style' })
    addLog('preinit(..., { as: "style" }) - stylesheet initialized eagerly')
  }

  return (
    <DemoWrapper
      title="Asset Loading APIs"
      description="React 19 provides prefetchDNS, preload, and preinit from react-dom. Check the Network tab in DevTools."
    >
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={runPrefetchDNS}>prefetchDNS</button>
        <button onClick={runPreload}>preload (style)</button>
        <button onClick={runPreinit}>preinit (style)</button>
      </div>
      <hr />
      <strong>Log:</strong>
      <ul style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', listStyle: 'none', padding: 0 }}>
        {log.map((entry, i) => <li key={i} style={{ padding: '0.15rem 0' }}>{entry}</li>)}
      </ul>
    </DemoWrapper>
  )
}
