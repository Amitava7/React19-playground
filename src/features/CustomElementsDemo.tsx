import { useEffect, useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

class MyCounter extends HTMLElement {
  static observedAttributes = ['count', 'label']

  connectedCallback(): void {
    this._render()
  }

  attributeChangedCallback(): void {
    this._render()
  }

  private _render(): void {
    const count = this.getAttribute('count') ?? '0'
    const label = this.getAttribute('label') ?? 'Count'
    this.innerHTML = `
      <div style="padding:0.75rem 1rem;background:rgba(124,124,255,0.1);border-radius:8px;display:inline-block;border:1px solid rgba(124,124,255,0.2)">
        <strong>${label}:</strong> ${count}
      </div>
    `
  }
}

function defineCustomElement(): void {
  if (!customElements.get('my-counter')) {
    customElements.define('my-counter', MyCounter)
  }
}

export default function CustomElementsDemo() {
  const [score, setScore] = useState(42)

  useEffect(() => { defineCustomElement() }, [])

  return (
    <DemoWrapper
      title="Custom Elements"
      description="React 19 has full support for Web Components. Props like numbers and booleans are passed correctly."
    >
      <p>Native Web Component used directly in JSX:</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
        <my-counter count={score} label="Score" />
        <my-counter count={7} label="Lives" />
      </div>
      <button onClick={() => setScore(s => s + 1)}>Increment Score</button>
    </DemoWrapper>
  )
}
