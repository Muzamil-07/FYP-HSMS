import React, { useState, useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AppContext from '../../context/appState/AppContext'
import Input from '../Generic/Input'
import TextArea from '../Generic/TextArea'
import { FormHeading } from '../Generic/FormHeading'
import Api from '../../Api'
import UsersContext from '../../context/users/UsersContext'
import { Button } from 'antd';
import { message } from 'antd';

export const Email=() => {




  const [ notify, setNotify ]=useState( { subject: "", description: "" } )
  const { onChangeGeneric, showAlert }=useContext( AppContext );
  const { Cookies, user }=useContext( UsersContext )

  const onChange=onChangeGeneric( notify, setNotify );

  const formRef=useRef( null );
  const [ loading, setLoading ]=useState( false )




  const sendEmail=async ( e ) => {
    e.preventDefault();
    const cookie=Cookies.get( 'jwt' );

    const res=await Api.get( '/users', {
      headers: { Authorization: `Bearer ${cookie}` }
    } )

    try {

      console.log( res.data.data.data )


      if ( res.data.status==="success" ) {
        setLoading( false )
        formRef.current.reset()
        const users=res.data.data.data;
        users.forEach( async ( el ) => {
          await emailjs.send( 'service_6tkhh5s', 'template_1jz8usn', {
            user_name: `${el.firstName+' '+el.lastName}`,
            message: `${notify.description}`,
            subject: `${notify.subject}`,
            user_email: `${el.email}`,
          }, 'G3SQs4EJPCv8WQlOP' )


        } );

        // showAlert( `Notification sent to all users successfully!`, "success" );
        message.success( `Notification sent to all users successfully!` );
      }
      else
        throw new Error();
    }
    catch ( e ) {
      setLoading( false )
      // showAlert( `Something went wrong!`, "danger" );
      message.error( 'Something went wrong!' );
    }


  };

  return (

    <div style={{ margin: "2rem 10rem" }}>
      <div className='mt-5 mb-2'>
        <FormHeading value="Notification" subHeading="Send notification to all users" />
      </div>



      <form ref={formRef} onSubmit={sendEmail}>

        <div className="container" >
          <div className="row">


            <div className="col-12">
              <Input placeholder="Subject" labelVal={"Subject"} width="100%" name="subject" type="text" onChange={onChange} />
            </div>

            <div className="col-12">
              <TextArea placeholder="Description" width="100%" name="description" rows={12} onChange={onChange} />
            </div>

            <div className='text-center'>
              <Button type="submit" htmlType="submit" loading={loading} onClick={() => setLoading( true )} className="btn form_btn me-4">Submit</Button>
              <Button type="reset" htmlType="reset" className="btn reset_btn">Reset</Button>
            </div>

          </div>


        </div>



      </form>
    </div>

  );
};