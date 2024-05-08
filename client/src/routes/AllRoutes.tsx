import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Register from "../pages/Register"
import CreateTrip from "../pages/CreateTrip"
import PrivateRoute from "./PrivateRoute"
import Enquiries from "../pages/Enquiries"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={< HomePage/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/createMyTrip" element={<PrivateRoute><CreateTrip/></PrivateRoute>}/>
      <Route path="/enquiries" element={<PrivateRoute><Enquiries/></PrivateRoute>}/>
    </Routes>
  )
}

export default AllRoutes