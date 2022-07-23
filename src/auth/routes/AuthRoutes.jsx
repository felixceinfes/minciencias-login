import { Navigate, Route, Routes } from "react-router-dom";
import { ActivateAccount, LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
     <Routes>
        <Route path="login" element={<LoginPage/>} exact/>
        <Route path="register" element={<RegisterPage/>} exact/>
        <Route path="account/activate/:token" element={<ActivateAccount/>} exact/>
        <Route path="/*" element={<Navigate to="/login"/>} />
     </Routes>
  )
}
