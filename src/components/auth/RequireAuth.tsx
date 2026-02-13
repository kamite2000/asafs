import { Navigate, useLocation } from 'react-router-dom';
import { useContent } from '@/lib/ContentContext';
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { Loader2 } from 'lucide-react';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { currentUser, isLoading } = useContent();
    const location = useLocation();

    if (isLoading) {
        return <PageSkeleton />;
    }

    if (!currentUser) {
        // Redirect them to the /admin login page, but save the current location they were
        // trying to go to when they were redirected.
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
