import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
      <Routes>
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
