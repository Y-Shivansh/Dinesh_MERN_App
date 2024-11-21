import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/SigninForm'
import { Signup } from './pages/SignupForm'
import { PrivateRoute } from './components/PrivateRoute'
import { VerificationForm } from './pages/VerificationForm'
import { ResetForm } from './pages/ResetForm'
import { ResetFormVerification } from './pages/ResetFormVerificationForm'
import Landing from './pages/Landing'
// import { Landing } from './pages/Landing'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Landing/>}/>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/signup/verify" element={<VerificationForm />} />
          <Route path="/reset-password" element={<ResetForm />} />
          <Route path='/reset-password-verification' element={<ResetFormVerification/>}/>
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
