import { useOptimistic, useState, useTransition } from 'react'
import DemoWrapper from '../components/DemoWrapper'
import { fakeRequest } from '../fakeserver'

interface Todo {
  id: number
  text: string
  done: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn React 19', done: false },
  { id: 2, text: 'Build a demo app', done: false },
  { id: 3, text: 'Ship to production', done: false },
]

export default function UseOptimisticDemo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [optimisticTodos, addOptimisticToggle] = useOptimistic(
    todos,
    (state: Todo[], toggledId: number): Todo[] =>
      state.map(t => t.id === toggledId ? { ...t, done: !t.done } : t)
  )

  function toggle(id: number): void {
    startTransition(async () => {
      setError(null)
      addOptimisticToggle(id)
      try {
        await fakeRequest(null, { ms: 800, fail: Math.random() > 0.5 })
        setTodos(prev =>
          prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
        )
      } catch {
        setError('Server failed, change reverted!')
      }
    })
  }

  return (
    <DemoWrapper
      title="useOptimistic"
      description="Todos toggle immediately (optimistic). 50% chance the server fails and reverts the change."
    >
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo.id)}
                disabled={isPending}
              />
              <span style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.5 : 1,
              }}>
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: '#ef4444', marginTop: '0.5rem' }}>{error}</p>}
    </DemoWrapper>
  )
}
