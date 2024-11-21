import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { PrivateRoute } from './components/PrivateRoute'
import { SignupVerify } from './pages/SignupVerify'
// import { Landing } from './pages/Landing'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element = {<Landing/>}/> */}
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/signup/verify" element={<SignupVerify />} />
          {/* <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
