import '../../css/App.css';
import '../../css/index.css'
import { FaEye } from "react-icons/fa";
import React, { useRef, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useContext } from 'react';
import UsersContext from '../../context/users/UsersContext';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';

const endPoint='users/signup';
const nameReg=/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
const passwordReg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const emailReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;





const SignupForm=() => {

  const fnameRef=useRef();

  const [ fname, setFname ]=useState( "" );
  const [ validFname, setValidFname ]=useState( false );
  const [ focusFname, setFocusFname ]=useState( false );

  const [ lname, setLname ]=useState( "" );
  const [ validLname, setValidLname ]=useState( false );
  const [ focusLname, setFocusLname ]=useState( false );

  const [ email, setEmail ]=useState( "" );
  const [ validEmail, setValidEmail ]=useState( false );
  const [ focusEmail, setFocusEmail ]=useState( false );

  const [ cnic, setCnic ]=useState( "" );
  const [ validCnic, setValidCnic ]=useState( false );
  const [ focusCnic, setFocusCnic ]=useState( false );

  const [ password, setPassword ]=useState( "" );
  const [ validPassword, setValidPassword ]=useState( false );
  const [ focusPassword, setFocusPassword ]=useState( false );

  const [ mpassword, setMpassword ]=useState( "" );
  const [ validMpassword, setValidMpassword ]=useState( false );
  const [ focusMpassword, setFocusMpassword ]=useState( false );

  const [ agreePolicey, setAgreePolicey ]=useState( false );

  // Checking validity and setting the state of validity usestates

  useEffect( () => setValidFname( nameReg.test( fname ) ), [ fname ] );
  useEffect( () => setValidLname( nameReg.test( lname ) ), [ lname ] );
  useEffect( () => setValidEmail( emailReg.test( email ) ), [ email ] );
  useEffect( () => setValidCnic( cnic.length===15 ), [ cnic ] );
  useEffect( () => setValidPassword( passwordReg.test( password ) ), [ password ] );
  useEffect( () => setValidMpassword( password===mpassword ), [ password, mpassword ] );
  useEffect( () => fnameRef.current.focus(), [] );


  const { Cookies }=useContext( UsersContext );
  const navigate=useNavigate();

  //Sending request to the server
  const handleSubmission=async function ( e ) {
    e.preventDefault();
    try {
      const res=await Api.post( endPoint, {
        firstName: fname,
        lastName: lname,
        email,
        password,
        CNIC: cnic,
        passwordConfirm: mpassword
      } );


      if ( res.data.status==="success" ) {
        Cookies.set( 'jwt', res.data.token );
        navigate( "/" );
      }



    }
    catch ( err ) {
      console.log( err );
    }


  };


  return (

    <div className='background' >
      <div className="clipPath"  >



        <div className='container ' >
          <h1 className='formHeading'>Sign Up</h1>
          <form className='form1' onSubmit={handleSubmission}>

            <div className="mb-3" >
              <input type="text" ref={fnameRef} id="inputLastName" onChange={( e ) => setFname( e.target.value )}
                placeholder='First Name' className='signUpInput' onBlur={() => setFocusFname( false )} onFocus={() => setFocusFname( true )} autoComplete="off" />
            </div>

            <p className={!validFname&&fname&&!focusFname? 'errBox':'dontShow'} >Invlaid name ( use alphabets only! )</p>

            <div className="mb-3" >
              <input type="text" id="inputFirstName" onChange={( e ) => setLname( e.target.value )}
                placeholder='Last Name' className='signUpInput' onBlur={() => setFocusLname( false )} onFocus={() => setFocusLname( true )} autoComplete="off" />
            </div>

            <p className={!validLname&&lname&&!focusLname? 'errBox':'dontShow'} >Invlaid name ( use alphabets only! )</p>

            <div className="mb-3">
              <input type="email" id="inputEmail" placeholder='Email' className='signUpInput' onChange={( e ) => setEmail( e.target.value )} onBlur={() => setFocusEmail( false )} onFocus={() => setFocusEmail( true )} autoComplete="off" />
            </div>

            <p className={!validEmail&&email&&!focusEmail? 'errBox':'dontShow'} >Invlaid email</p>

            <div className="mb-3">
              <InputMask mask="99999-9999999-9" maskChar={null} type="text" id="inputCnic" placeholder='CNIC' className='signUpInput' onChange={( e ) => setCnic( e.target.value )} onBlur={() => setFocusCnic( false )} onFocus={() => setFocusCnic( true )} autoComplete="off" />
            </div>
            <p className={!validCnic&&cnic&&!focusCnic? 'errBox':'dontShow'} >Invlaid CNIC</p>

            <div className="mb-3">
              <input type="password" id="inputPassword" placeholder='Password' className='signUpInput' onChange={( e ) => setPassword( e.target.value )} onBlur={() => setFocusPassword( false )} onFocus={() => setFocusPassword( true )} autoComplete="off" /><span className='forminput_icon' ><FaEye /></span>
            </div>
            <p className={!validPassword&&password&&!focusPassword? 'errBox':'dontShow'} >Length: 8-15 , Must include [Uppercase,Special Characters,Numbers]</p>
            <div className="mb-3">
              <input type="password" id="inputMathPassword" placeholder='Confirm Password'
                className='signUpInput' onChange={( e ) => setMpassword( e.target.value )} onBlur={() => setFocusMpassword( false )} onFocus={() => setFocusMpassword( true )} autoComplete="off" /><span className='forminput_icon'><FaEye /></span>
            </div>
            <p className={!validMpassword&&mpassword&&!focusMpassword? 'errBox':'dontShow'} >Password must math confirm passowrd</p>
            <div className="form-check checkbox">
              <input className="form-check-input checkboxInput" type="checkbox" onChange={( e ) => setAgreePolicey( e.target.checked )} id="flexCheckDefault" />
              <label className="form-check-label " htmlFor="flexCheckDefault" >
                I agree with <a href="/"><span className='span'>privacy</span> & <span className='span'>policy</span></a>
              </label>
            </div>

            <button className={validCnic&&validEmail&&validFname&&validLname&&validMpassword&&validPassword&&agreePolicey? 'btn btn-dark signupButton':'btn btn-dark signupButton disabled'}  >SIGN UP</button>

          </form>
          <div className='row login'>
            {/* <div className='col-3 text-muted'>Already have an account ?</div> */}

          </div>
        </div>

      </div>
    </div>

  );
};

export default SignupForm;