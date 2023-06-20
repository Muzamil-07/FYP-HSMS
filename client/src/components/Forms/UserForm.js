import React, { useContext, useState } from 'react'
import Input from '../Generic/Input';
import { FormHeading } from '../Generic/FormHeading';
import AppContext from '../../context/appState/AppContext';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from "@material-ui/core";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import { message } from 'antd';

const UserForm=( props ) => {
  const endPoint='users/';
  const { onChange, values, nextStep, userFormStatus, setUserFormStatus, formVal, setFormVal }=props;

  const [ errorState, setErrorState ]=useState( false )
  const [ errorMsg, setErrorMsg ]=useState( "" )

  const [ showPassword1, setShowPassword1 ]=useState( false );
  const [ showPassword2, setShowPassword2 ]=useState( false );

  const [ loading, setLoading ]=useState( false )


  const handleClickPass=() => {

    setShowPassword1( prev => !prev );

  }

  const handleClickConfirmPass=() => {
    setShowPassword2( prev => !prev );
  }

  const { showAlert, setAlert }=useContext( AppContext );
  const { Cookies }=useContext( UsersContext );


  const moveToNext=( e ) => {
    e.preventDefault();
    nextStep();

  }



  //?  Form Submission
  const handleUserFormSubmit=async ( e ) => {

    e.preventDefault();

    console.log( "hiiiiiiiiii" )
    const cookie=Cookies.get( 'jwt' );
    const data={
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      CNIC: values.CNIC,
      passwordConfirm: values.passwordConfirm,
      phone: values.phone
    };

    if ( values.password!==values.passwordConfirm ) {

      setErrorMsg( "Password and Password Confirm are not same" )
      setLoading( false );
      setErrorState( true );


    }
    else {


      try {
        let res;
        if ( !formVal.userId ) {
          res=await Api.post( endPoint,
            data,
            {
              // withCredentials: true,
              headers: { Authorization: `Bearer ${cookie}` }
            }
          )

        } else {

          res=await Api.patch( `users/${formVal.userId}`,
            data,
            {
              // withCredentials: true,
              headers: { Authorization: `Bearer ${cookie}` }
            }
          )
        }

        // console.log( res.data.status );
        if ( res.data.status==="success" ) {
          setLoading( false );
          // showAlert( `User has been ${formVal.userId? 'updated':'created'} successfully!`, "success" );
          message.success( `User has been ${formVal.userId? 'updated':'created'} successfully!` );
          setUserFormStatus( res.data.status );
          setFormVal( { ...formVal, userId: res.data.data.id } )

        }
      }


    


      catch ( err ) {

        setLoading( false );      
      console.log( err.response.data );

      if(err.response.data.message.includes("email_1 dup key")){
        // showAlert( "User with this email already exist!", "danger" );
        message.error( "User with this email already exist!" );
      }
      else if(err.response.data.message.includes("CNIC_1 dup key")){
        // showAlert( "User with this CNIC already exist!", "danger" );
        message.error( "User with this CNIC already exist!" );
      }
      else if(err.response.data.message.includes("Password and Confirm-password are not same!")){
        // showAlert( "Password and Confirm Password are not same!", "danger" );
        message.error( "Password and Confirm Password are not same!" );
      }
      else if(err.response.data.message.includes("Password must be of atleast 8 characters long")){
        // showAlert( "Password must be of atleast 8 characters long!", "danger" );
        message.error( "Password must be of atleast 8 characters long!" );
      }
      else if(err.response.data.message.includes("Phone No. must be of atleast 11 digits numbers")){
        // showAlert( "Phone No. must be of atleast 11 digits numbers long!", "danger" );
        message.error( "Phone No. must be of atleast 11 digits numbers long!" );
      }

    }
  }
  }
  return (
    <div>

      <div >
        <FormHeading value="User Details" subHeading="Fill out all user details" />
      </div>

      <form onSubmit={handleUserFormSubmit}>

        <div className="container" >
          <div className="row">


            <div className="col-6 text-end mt-3">

              <InputMask mask="99999-9999999-9" defaultValue={values.CNIC} maskChar={null} type="text" id="inputCnic" onChange={onChange} autoComplete="off" name="CNIC"  >
                {() => <TextField variant="standard" name="CNIC" defaultValue={values.CNIC} required className='input' label="Enter CNIC" style={{ width: "60%" }} />}
              </InputMask>

              {/* <p className="input_label_l" style={{ width: "60%" }}>CNIC</p> */}


            </div>



            <div className="col-6 inputBox mt-3">
              <Input placeholder="Enter email" width="60%" name="email" type="email" onChange={onChange} margin="" defaultValue={values.email} label='r' labelVal="Email Address" />

            </div>

            <div className="col-6 text-end inputBox mt-3">
              <Input placeholder="Enter firstname" width="60%" name="firstName" type="text" onChange={onChange} margin="" defaultValue={values.firstName} label='l' labelVal="First Name" />
            </div>

            <div className="col-6 mt-3">
              <Input placeholder="Enter lastname" width="60%" name="lastName" type="text" onChange={onChange} defaultValue={values.lastName} label='r' labelVal="Last Name" />
            </div>


            <div className="col-6 text-end mt-3">
              <Input placeholder="Enter Password" width="60%" name="password" type={showPassword1? "text":"password"} onChange={onChange} defaultValue={values.password} label='l' labelVal="Password" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickPass}
                      edge="end"
                    >
                      {showPassword1? <EyeTwoTone />:<EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                )
              }} />
            </div>

            <div className="col-6  mt-3">
              <Input placeholder="Confirm Password" error={errorState} helperText={errorMsg} width="60%" name="passwordConfirm" type={showPassword2? "text":"password"} onChange={onChange} defaultValue={values.passwordConfirm} label='r' labelVal="Confirm Password" InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickConfirmPass}
                      edge="end"
                    >
                      {showPassword2? <EyeTwoTone />:<EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                )
              }} />
            </div>

            <div className="col-12  mt-3 text-center">
              {/* <Input placeholder="Enter Phone no" width="60%" name="phone" type="number" onChange={onChange} defaultValue={values.phone} label='c' labelVal="Phone No" /> */}

              <InputMask mask="0399-99999999" maskChar={null} defaultValue={values.phone} type="text" onChange={onChange} autoComplete="off"   >
                {() => <TextField variant="standard" name="phone" defaultValue={values.phone} required className='input' label="Enter Phone no" style={{ width: "60%" }} />}
              </InputMask>

            </div>

            <div className='text-center mt-2 container'>
              {/* <button className="btn form_btn me-4" disabled={!values.CNIC||!values.email||!values.firstName||!values.lastName||!values.password||!values.passwordConfirm} onClick={moveToNext}>Next</button> */}

              <div className="col-12 text-center">
                {/* <button type='submit' className="btn form_btn" disabled={!values.CNIC||!values.email||!values.firstName||!values.lastName||!values.password||!values.passwordConfirm||!values.phone} >{formVal.userId? 'Update':'Submit'}</button> */}


                <Button

                  loading={loading}
                  onClick={() => setLoading( true )}
                  type='submit' className="btn form_btn" disabled={!values.CNIC||!values.email||!values.firstName||!values.lastName||!values.password||!values.passwordConfirm||!values.phone}

                  htmlType="submit"
                >
                  {formVal.userId? 'Update':'Submit'}
                </Button>


              </div>

              {/* disabled={userFormStatus==='fail'? true:false} */}
              <div className="col-12 text-end mb-3">
                {/* <button className="btn form_next_btn "  onClick={moveToNext}>next <span className='right_arrow'>&#8594;</span></button> */}
                <button className="btn form_next_btn " disabled={userFormStatus==='fail'? true:false} onClick={moveToNext}>next <span className='right_arrow'>&#8594;</span></button>


              </div>

            </div>


          </div>

        </div>


        {/* </div> */}



      </form>
    </div>

  )
}

export default UserForm