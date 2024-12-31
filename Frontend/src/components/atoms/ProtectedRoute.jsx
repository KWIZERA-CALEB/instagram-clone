import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
    const { authUser } = useAuthStore();

    if (!authUser) { 
        return <Navigate to="/login" />; 
    } 
    
    return children;
}

export default ProtectedRoute
