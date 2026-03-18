import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Demos } from './routes'
import Sidebar from './components/Sidebar'

function Home() {
  return (
    <div className="home">
      <title>React 19 Demos</title>
      <h1>React 19 Demos</h1>
      <p>Explore the new features and hooks introduced in React 19. Pick a demo from the sidebar to get started.</p>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="app-main">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path='/' element={<Home />} />
              {
                Demos.map(({ path, Demo }) => <Route key={path} path={path} element={<Demo />} />)
              }
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
