import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

export default function AuthGuard({ children }) {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0a0a0a',
                minHeight: 'calc(100vh - 200px)'
            }}>
                <Loader />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login-register' replace />;
    }

    return children;
}
