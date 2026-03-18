import { createContext, use, useState } from 'react'
import DemoWrapper from '../components/DemoWrapper'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<Theme>('light')

function ThemedCard() {
  const theme = use(ThemeContext)
  return (
    <div style={{
      padding: '1rem',
      background: theme === 'dark' ? '#1e1e2e' : '#f8f9fa',
      color: theme === 'dark' ? '#cdd6f4' : '#1e1e2e',
      borderRadius: '8px',
      transition: 'all 0.3s',
      border: '1px solid',
      borderColor: theme === 'dark' ? '#313244' : '#dee2e6',
    }}>
      Current theme: <strong>{theme}</strong>
    </div>
  )
}

export default function ContextAsProviderDemo() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <ThemeContext value={theme}>
      <DemoWrapper
        title="Context as Provider"
        description="React 19 lets you write <MyContext value={...}> instead of <MyContext.Provider value={...}>."
      >
        <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          Toggle theme (currently: {theme})
        </button>
        <br /><br />
        <ThemedCard />
      </DemoWrapper>
    </ThemeContext>
  )
}
