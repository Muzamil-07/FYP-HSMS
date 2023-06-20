import React, { useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

import UsersContext from "../../context/users/UsersContext";
import Api from '../../Api'
import jwtDecode from "jwt-decode";
import AppContext from "../../context/appState/AppContext";

const ProtectedRoute=( {
  redirectPath='/login',
  children,
  role
} ) => {

  // Check user token here
  const navigate = useNavigate();
  const { Cookies }=useContext( UsersContext )
  const { decryptData }=useContext( AppContext )
  const jwt=Cookies.get( 'jwt' );

  let user;

  // const UR=Cookies.get( 'UR' );
  const UR=window.localStorage.getItem( 'UR' );

  if ( UR ) {
    user=decryptData( UR )

  }


  
  (async () => {
    try {
      const res= await Api.get(`/users/${user.id}`)
      if(res.data.status !== 'success'){
        
        Cookies.remove('jwt');
        window.localStorage.removeItem( 'UR' )
        navigate('/login')
      }
      
     } catch (err) {
       console.log(err)
     }
  

  })();
  


  if ( !jwt||!user||( jwtDecode( Cookies.get( 'jwt' ) ).id!==user.id ) ) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if ( role && !role.includes( user.role ) ) {
    return <Navigate to={'/error'} replace />;
  }

  return children;
};


export default ProtectedRoute;