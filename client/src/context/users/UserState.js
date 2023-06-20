import React, { useState, useEffect } from 'react';
import UsersContext from './UsersContext';
import jwtDecode from 'jwt-decode';
import Api from '../../Api';
import Cook from 'js-cookie';
import {useGetUserQuery} from '../../services/nodeApi';
let CryptoJS=require( "crypto-js" );


const UserState=( props ) => {
  
  const [ user, setUser ]=useState( {} );




  const Cookies=Cook.withAttributes( {
    path: '/', sameSite: 'Strict', secure: true
  } )



  const retrieveUserInfo=async ( id ) => {
    const endPoint='users/'+id;
    const res=await Api.get( endPoint, {
      headers: { "Authorization": "Bearer "+Cookies.get( 'jwt' ) }
    } );

    setUser( res.data.data );
    return res.data.data;
  }

  const getUserInstallment=async ( id ) => {
    const endPoint='installment/userid/'+id;
    const res=await Api.get( endPoint,{
      headers: { Authorization: `Bearer ${ Cookies.get( 'jwt' )}` }
    } );
    return res.data.data;
  }

  const getUserPlot=async ( id ) => {
    const endPoint='plots/userid/'+id;
    const res=await Api.get( endPoint ,{
      headers: { Authorization: `Bearer ${ Cookies.get( 'jwt' )}` }
    });
    return res.data.data;
  }

  const getUserEditPrefil=async ( id ) => {
    const endPoint='users/edit/'+id;
    const res=await Api.get( endPoint ,{
      headers: { Authorization: `Bearer ${ Cookies.get( 'jwt' )}` }
    });
    return res.data.data;
  }

  const encryptData=( data ) => {
    // Encrypt
    let ciphertext=CryptoJS.AES.encrypt( JSON.stringify( data ), 'my-secret-key@123' ).toString();
    return ciphertext;

  }

  let userId;
  useEffect( async () => {

    if ( Cookies.get( 'jwt' ) ) {
      userId=jwtDecode( Cookies.get( 'jwt' ) ).id;
      console.log('hi from use effect');
      const data=await retrieveUserInfo( userId );
      // PERSISTING USER STATE(OPTIONAL)
      window.localStorage.removeItem( 'UR' )
      window.localStorage.setItem( 'UR', encryptData( data ) )

    }

  }, [] )


  return (
    
    <UsersContext.Provider value={{ user, setUser, retrieveUserInfo,getUserInstallment, getUserPlot,getUserEditPrefil,Cookies }}>
      {props.children}
    </UsersContext.Provider>

  )
}

export default UserState