import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function RequireAuth({ allowedRoles }) {
    const location = useLocation();
    const roles = localStorage.getItem('roles');
    return (
        roles.find(role => allowedRoles.includes(role)) ? (
            <Outlet />
        ) : (<Navigate to='/login' state={{from: location }} replace/>)
    );
}

export default RequireAuth;