import { useActionState } from 'react'
import DemoWrapper from '../components/DemoWrapper'
import { fakeRequest } from '../fakeserver'

interface FormState {
  error?: string
  success?: boolean
  message?: string
}

async function submitAction(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string
  if (!name) return { error: 'Name is required' }
  await fakeRequest(null, { ms: 1500, fail: Math.random() < 0.5 })
  return { success: true, message: `Hello, ${name}! Form submitted.` }
}

export default function UseActionStateDemo() {
  const [state, formAction, isPending] = useActionState(submitAction, null)

  return (
    <DemoWrapper
      title="useActionState"
      description="Handles async form submission with automatic pending state, error, and result. 50% chance of failure."
    >
      <form action={formAction}>
        <input name="name" placeholder="Enter a name..." disabled={isPending} />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {state?.error && <p style={{ color: '#ef4444' }}>{state.error}</p>}
      {state?.success && <p style={{ color: '#4ade80' }}>{state.message}</p>}
    </DemoWrapper>
  )
}
