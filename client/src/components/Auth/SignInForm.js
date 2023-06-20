import './../../css/Login.css'
import Api from '../../Api';
import React, { useContext, useState } from 'react';
import UsersContext from '../../context/users/UsersContext';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/appState/AppContext';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Form, Input, Button, message } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
// import { message } from 'antd';


const endPoint='users/login';
const FormItem = Form.Item;


const SignInForm=() => {
  const { retrieveUserInfo, user, Cookies }=useContext( UsersContext );
  const { encryptData, showAlert }=useContext( AppContext );

  const [ loading, setLoading ]=useState( false )



  const navigate=useNavigate();


  const handleLogin=async ( values ) => {
    let creds = {
      email:values.email,
      password:values.password
    }
    try{
      setLoading( true );
    const res=await Api.post( endPoint, creds );
    
    if ( res.data.status==="success" ) {
      setLoading( false );
      Cookies.set( 'jwt', res.data.token );
      const data = await retrieveUserInfo( res.data.data.user._id )

      const encData=encryptData( data );
      window.localStorage.setItem( 'UR', encData )

      if ( res.data.data.user.role==='user' ) {
        setLoading( false );
        // showAlert( 'Logged in successfully', 'success' )
        message.success( 'Logged in successfully' )
        setTimeout( () => {
          navigate( '/dashboard/profile' )
        }, 4000 )
      } else {

        setLoading( false );
        // showAlert( 'Logged in successfully', 'success' )
        message.success( 'Logged in successfully' )
        setTimeout( () => {
          navigate( '/dashboard' )
        }, 4000 )


      }

    }
    } catch ( err ) {
      setLoading( false );
      // console.log( err.response )
      message.error( err.response? err.response.data.message:'Your internet connection is slow!' )
    // showAlert(err.response.data.message,'danger')
  }

  }


  return (

    <div>
    <div className={"lContainer"}>
    <div className="lItem">
        <div className="loginImage">
          <img src={require('./../../building.svg')} width="300" style={{position: 'relative'}} alt="login"/>
        </div>
        <div className="loginForm">
          <h2>Login</h2>
            <Form  className="login-form" onFinish={handleLogin}>
            <FormItem
            name="email"
            rules={[
              {
                required: true,
                type:'email',
                message:'Please enter valid email'
              },
            ]}
            >
             
              
                <Input
                  prefix={<MailOutlined style={{opacity:0.3}} className="site-form-item-icon" />}
                  placeholder="Email"
                />
            </FormItem>
            <FormItem
            name="password"
            rules={[
              {
                required: true,
                message:'Please enter password'
              },
            ]}
            >
                <Input.Password
                  prefix={<LockOutlined style={{opacity:0.3}} className="site-form-item-icon" />}
                  placeholder="Password"
                />
                
            </FormItem>
            <FormItem>
            
              <Button
                
                htmlType="submit"
                className="login-form-button"
                  style={{ backgroundColor: '#bd960a', color: 'white' }}
                  loading={loading}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
    </div>
    </div>
    </div>

  );
};

export default SignInForm;