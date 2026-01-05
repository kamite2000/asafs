import { Navigate, useLocation } from 'react-router-dom';
import { useContent } from '@/lib/ContentContext';
import { Loader2 } from 'lucide-react';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { currentUser, isLoading } = useContent();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!currentUser) {
        // Redirect them to the /admin login page, but save the current location they were
        // trying to go to when they were redirected.
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
