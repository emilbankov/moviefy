// Commented out due to backend issues - will be uncommented when backend is fixed
/*
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to='/login-register' />;
    }

    return <Outlet />;
}
*/
