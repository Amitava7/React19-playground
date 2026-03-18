import { Component, type ReactNode, useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<{ children: ReactNode; onReset?: () => void }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}>
          <strong>ErrorBoundary caught:</strong> {this.state.error?.message}
          <br /><br />
          <button onClick={() => {
            this.setState({ hasError: false, error: null })
            this.props.onReset?.()
          }}>
            Reset
          </button>
          <br /><br />
          <small style={{ color: 'var(--text-muted)' }}>Check the console, onCaughtError logged it</small>
        </div>
      )
    }
    return this.props.children
  }
}

function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error('Boom! Component exploded.')
  return <p>Component is healthy.</p>
}

export default function ErrorHandlingDemo() {
  const [explode, setExplode] = useState(false)

  return (
    <DemoWrapper
      title="Error Handling"
      description="React 19 adds onCaughtError / onUncaughtError callbacks to createRoot (see main.tsx). Click below to trigger."
    >
      <ErrorBoundary onReset={() => setExplode(false)}>
        <Bomb explode={explode} />
      </ErrorBoundary>
      <br />
      <button onClick={() => setExplode(true)} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
        Throw error
      </button>
    </DemoWrapper>
  )
}
