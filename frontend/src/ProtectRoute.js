import React from 'react';
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({Element}) {
    const {isAuthenticated}=useSelector(state => state.auth);
  return (
    isAuthenticated?
        <Element />
        :
        <Navigate
          to="/login"
          replace
        />
  )
}
