import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import FullScreenPreloader from '../molecules/FullScreenPreloader';

const AuthProtectedRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const location = useLocation();

    useEffect(() => {
        if (!authUser) {
            checkAuth();
        }
    }, [authUser, checkAuth]);

    if (isCheckingAuth) {
        return <FullScreenPreloader />; 
    }

    if (authUser) { 
        return <Navigate to={location.state?.from || "/"} replace />; 
    } 
    
    return children;
}

export default AuthProtectedRoute
