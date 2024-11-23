import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signin } from './pages/SigninForm';
import { Signup } from './pages/SignupForm';
import FoodDetail from './pages/FoodDetail';
import Profile from './pages/Profile';
import { PrivateRoute } from './components/PrivateRoute';
import { VerificationForm } from './pages/VerificationForm';
import { ResetForm } from './pages/ResetForm';
import { ResetFormVerification } from './pages/ResetFormVerificationForm';
import Landing from './pages/Landing';
import FoodListingPage from './pages/FoodListingPage';
import UpdatePassword from './pages/UpdatePassword';
import { DonateFood } from './components/DonateFood';
import ProfileUpdate from './components/ProfileUpdate';

import { MyListing } from './pages/MyListing';
import { UpdateListingForm } from './components/UpdateListingForm';


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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update-password" element={<UpdatePassword />} />
          <Route path='/donate-food' element={<DonateFood/>}/>
          <Route path='/updateMe' element={<ProfileUpdate/>}/>

          <Route path='/my-listings' element={<MyListing/>}/>
          <Route path='/update-listing/:id' element={<UpdateListingForm/>}/>
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

