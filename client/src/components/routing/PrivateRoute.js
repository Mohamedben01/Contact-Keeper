import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token } = authContext;
    //If Authorized return an outlet that will render child elements
    //If not , return element that will navigate ti login page
    return token !== null ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute
