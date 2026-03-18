import { useRef, type Ref, type InputHTMLAttributes } from 'react'
import DemoWrapper from '../components/DemoWrapper'

interface FancyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  ref?: Ref<HTMLInputElement>
}

function FancyInput({ label, ref, ...props }: FancyInputProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  )
}

export default function RefAsPropDemo() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <DemoWrapper
      title="ref as prop"
      description="In React 19, function components accept ref directly as a prop. No more forwardRef() wrapper."
    >
      <FancyInput label="Name:" ref={inputRef} placeholder="Type here..." />
      <br />
      <button onClick={() => inputRef.current?.focus()}>
        Focus input via ref
      </button>
    </DemoWrapper>
  )
}
