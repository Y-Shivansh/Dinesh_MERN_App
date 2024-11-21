import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signin } from './pages/SigninForm';
import { Signup } from './pages/SignupForm';
import FoodDetail from './pages/FoodDetail';
import { PrivateRoute } from './components/PrivateRoute';
import { VerificationForm } from './pages/VerificationForm';
import { ResetForm } from './pages/ResetForm';
import { ResetFormVerification } from './pages/ResetFormVerificationForm';
import Landing from './pages/Landing';
import FoodListingPage from './pages/FoodListingPage'; // Import the FoodListingPage component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/signup/verify" element={<VerificationForm />} />
          <Route path="/reset-password" element={<ResetForm />} />
          <Route path="/reset-password-verification" element={<ResetFormVerification />} />
          <Route path="/food-listings" element={<FoodListingPage />} /> {/* Add FoodListingPage route */}
          <Route path="/food-detail/:id" element={<FoodDetail />} />
          {/* Uncomment if you want to use private routes
          <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

