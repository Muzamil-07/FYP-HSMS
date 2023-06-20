import React, { useState } from 'react';
import AppContext from './AppContext';
let CryptoJS=require( "crypto-js" );





const AppState=( props ) => {


  const [ alert, setAlert ]=useState( null );

  const encryptData=( data ) => {
    // Encrypt
    let ciphertext=CryptoJS.AES.encrypt( JSON.stringify( data ), 'my-secret-key@123' ).toString();
    return ciphertext;

  }

  const decryptData=( encryptedData ) => {
    // Decrypt
    let bytes=CryptoJS.AES.decrypt( encryptedData, 'my-secret-key@123' );
    let decryptedData=JSON.parse( bytes.toString( CryptoJS.enc.Utf8 ) );

    return decryptedData;

  }


  const showAlert=( msg, type ) => {

    setAlert( {
      msg,
      type
    } )
    setTimeout( () => setAlert( null ), 3000 )

  }

  const onChangeGeneric=( stateVar, stateModifier ) => {

    return (
      ( event ) => {
        // console.log( stateVar )
        stateModifier( { ...stateVar, [ event.target.name ]: event.target.value } )
      }
    )

  }


  return (

    <AppContext.Provider value={{ onChangeGeneric, showAlert, alert, setAlert, encryptData, decryptData }}>
      {props.children}
    </AppContext.Provider>

  )
}

export default AppState