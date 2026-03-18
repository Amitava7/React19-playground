import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Demos } from './routes'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <BrowserRouter>
      <Sidebar />
      <Suspense fallback={<div> Loading...</div>}>
        <Routes>
          <Route path='/' element={<div>Home element</div>} />
          {
            Demos.map(({ path, Demo }) => <Route path={path} element={<Demo />} />)
          }
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
