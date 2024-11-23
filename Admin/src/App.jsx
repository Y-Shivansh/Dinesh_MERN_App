import Login from "./pages/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageUsers from "./pages/ManageUser";
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/manage-user" element={< ManageUsers/>} />
          
        </Routes>
      </BrowserRouter>
  )
}
