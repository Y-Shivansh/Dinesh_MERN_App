import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageUsers from "./pages/ManageUser";
import { DashBoard } from "./pages/Dashboard";
import ModerateListings from "./pages/ModerateListings";
import StatisticsPage from "./pages/StatisticsPage";
import HandleReports from "./pages/HandleReports";
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<DashBoard/>} />
          <Route path="/manage-user" element={< ManageUsers/>} />
          <Route path="/moderate-listings" element={< ModerateListings/>} />
          
          <Route path="/app-statistics" element={< StatisticsPage/>} />
          <Route path="/handle-reports" element={< HandleReports/>} />

          <Route/>
          
        </Routes>
      </BrowserRouter>
  )
}
