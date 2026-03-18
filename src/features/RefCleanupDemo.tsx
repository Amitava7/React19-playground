import { useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

function LoggingBox() {
  const refCallback = (node: HTMLDivElement | null): (() => void) | void => {
    if (node) {
      console.log('[ref cleanup] element mounted:', node.tagName)
      node.style.outline = '2px solid #4ade80'

      return () => {
        console.log('[ref cleanup] element unmounted, cleanup ran')
      }
    }
  }

  return (
    <div ref={refCallback} style={{
      padding: '1rem',
      background: 'rgba(74, 222, 128, 0.1)',
      borderRadius: '8px',
      color: 'var(--text)',
    }}>
      I am mounted. Check the console!
    </div>
  )
}

export default function RefCleanupDemo() {
  const [show, setShow] = useState(true)

  return (
    <DemoWrapper
      title="ref cleanup function"
      description="Ref callbacks can return a cleanup function. Open the console and toggle to see mount/unmount logs."
    >
      <button onClick={() => setShow(v => !v)}>
        {show ? 'Unmount' : 'Mount'} element
      </button>
      <br /><br />
      {show && <LoggingBox />}
    </DemoWrapper>
  )
}
