import React from 'react';
import { useContent } from '@/lib/ContentContext';
import { useNavigate } from 'react-router-dom';
import AdminAuth from './AdminAuth';

const AdminIndex: React.FC = () => {
    const { currentUser } = useContent();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (currentUser) {
            navigate('/admin/dashboard');
        }
    }, [currentUser, navigate]);

    return <AdminAuth />;
};

export default AdminIndex;
