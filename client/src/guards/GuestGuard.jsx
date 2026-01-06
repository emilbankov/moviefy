import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

export default function GuestGuard({ children }) {
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

    // If user is authenticated, redirect to home page
    if (isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return children;
}
