import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes path="/">
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      
    </BrowserRouter>
    
  )
}

export default App
