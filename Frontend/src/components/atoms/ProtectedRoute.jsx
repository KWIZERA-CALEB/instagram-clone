import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect } from 'react';
import FullScreenPreloader from '../molecules/FullScreenPreloader';

const ProtectedRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        if (!authUser) {
            checkAuth();
        }
    }, [authUser, checkAuth]);

    if (isCheckingAuth) {
        return <FullScreenPreloader />; 
    }

    if (!authUser) { 
        return <Navigate to="/login" />; 
    } 
    
    return children;
}

export default ProtectedRoute
