import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const AppInitializer = ({ children }) => {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return children;
};

export default AppInitializer;
