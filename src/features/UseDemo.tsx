import { use, Suspense, createContext, useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

interface User {
  name: string
  role: string
}

function createUserPromise(): Promise<User> {
  return new Promise<User>(resolve =>
    setTimeout(() => resolve({ name: 'Amitav', role: 'Developer' }), 1200)
  )
}

const userPromise: Promise<User> = createUserPromise()

function UserCard() {
  const user = use(userPromise)
  return <p>User: {user.name} - {user.role}</p>
}

const MoodContext = createContext<string>('happy')

function MoodDisplay({ showMood }: { showMood: boolean }) {
  if (!showMood) return <p>Mood hidden</p>
  const mood = use(MoodContext)
  return <p>Current mood: {mood}</p>
}

export default function UseDemo() {
  const [showMood, setShowMood] = useState(false)

  return (
    <MoodContext value="excited">
      <DemoWrapper
        title="use() hook"
        description="use(promise) suspends until data resolves. use(context) can be called conditionally, unlike useContext."
      >
        <h4>use(Promise) with Suspense</h4>
        <Suspense fallback={<p style={{ color: 'var(--text-muted)' }}>Loading user...</p>}>
          <UserCard />
        </Suspense>

        <hr />

        <h4>use(Context) called conditionally</h4>
        <button onClick={() => setShowMood(v => !v)}>
          {showMood ? 'Hide' : 'Show'} Mood
        </button>
        <MoodDisplay showMood={showMood} />
      </DemoWrapper>
    </MoodContext>
  )
}
