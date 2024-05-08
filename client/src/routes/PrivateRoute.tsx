import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuth = localStorage.getItem("user");
    return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
