import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {getToken} from '../utils/handleAuth';
import axios from "axios";

const authClient = () => {
    const token = getToken();
    if(!token){
        return false;
    }
    const decodedToken = jwt_decode(token);
    //console.log(decodedToken);
    let tokenRole = decodedToken.role;
    if(tokenRole !== "ROLE_CLIENT"){
        return false;
    }
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
};

const ClientRoutes = () => {
    const isClientAuth = authClient();
    return isClientAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ClientRoutes;
