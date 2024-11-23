import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageUsers from "./pages/ManageUser";
import { DashBoard } from "./pages/Dashboard";
import ModerateListings from "./pages/ModerateListings";
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<DashBoard/>} />
          <Route path="/manage-user" element={< ManageUsers/>} />
          <Route path="/moderate-listings" element={< ModerateListings/>} />
          <Route/>
          
        </Routes>
      </BrowserRouter>
  )
}
