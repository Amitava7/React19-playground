import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import DemoWrapper from '../components/DemoWrapper'
import { fakeRequest } from '../fakeserver'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  )
}

async function saveAction(): Promise<{ saved: boolean }> {
  await fakeRequest(null, { ms: 1500 })
  return { saved: true }
}

export default function UseFormStatusDemo() {
  const [state, formAction] = useActionState(saveAction, null)

  return (
    <DemoWrapper
      title="useFormStatus"
      description="SubmitButton is a separate component that auto-disables while the parent form is pending. No props needed."
    >
      <form action={formAction}>
        <input name="note" placeholder="Type a note..." />
        <SubmitButton />
      </form>
      {state?.saved && <p style={{ color: '#4ade80' }}>Saved!</p>}
    </DemoWrapper>
  )
}
