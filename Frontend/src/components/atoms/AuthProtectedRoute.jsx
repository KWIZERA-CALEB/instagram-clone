import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const AuthProtectedRoute = ({ children }) => {
    const { authUser } = useAuthStore();

    if (authUser) { 
        return <Navigate to="/" />; 
    } 
    
    return children;
}

export default AuthProtectedRoute
