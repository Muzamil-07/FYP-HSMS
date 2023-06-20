import React, { useState, useContext,useRef } from 'react'
import Api from '../../Api'
import AppContext from '../../context/appState/AppContext'
import Input from '../Generic/Input'
import TextArea from '../Generic/TextArea'
import { FormHeading } from '../Generic/FormHeading'
import UsersContext from '../../context/users/UsersContext'
import './../../css/FeedbackForm.css'
import { message } from 'antd'






const FeedbackForm=() => {



  const { onChangeGeneric,showAlert }=useContext( AppContext );
  const { Cookies, user }=useContext( UsersContext )
  const formRef= useRef(null) 
  const [ complaintFormCred, setComplaintFormCred ]=useState( { name: `${user.firstName} ${user.lastName}`, email: `${user.email}`, subject: "", description: "" } )
  const onChange=onChangeGeneric( complaintFormCred, setComplaintFormCred );
  








  const createFeedback=async ( e ) => {
    e.preventDefault();
    const cookie=Cookies.get( 'jwt' );

    const res=await Api.post( '/complaints', complaintFormCred,{
      headers: { Authorization: `Bearer ${cookie}` }
    } )
    if ( res.data.status==="success" ) {
      formRef.current.reset()
      // showAlert( `Feedback sent successfully!`, "success" );
      message.success( 'Feedback sent successfully!' );

    }
    else{
      // showAlert( `Something went wrong!`, "danger" );
      message.error( 'Something went wrong!' );

    }

  }

  return (
    <>



      <div className='feedbackform_main'>
        <div className='my-5'>
          <FormHeading value="Feedback" subHeading="Submit your feedback here" />
        </div>



        <form ref={formRef} onSubmit={createFeedback}>

          <div className="container" >
            <div className="row">

              <div className="col-6">
                <Input placeholder="Name" width="100%" name="name" type="text" onChange={onChange} margin="ml-2" defaultValue={user.firstName+" "+user.lastName} disabled={true} />
              </div>

              <div className="col-6">
                <Input placeholder="Email" width="100%" name="email" type="email" onChange={onChange} defaultValue={user.email} disabled={true} />
              </div>

              <div className="col-12">
                <Input placeholder="Subject" labelVal="Subject" width="100%" name="subject" type="text" onChange={onChange} />
              </div>

              <div className="col-12">
                <TextArea placeholder="Description" width="100%" name="description" rows={12} onChange={onChange} />
              </div>

              <div className='text-center'>
                <button type="submit" className="btn form_btn me-4">Submit</button>
                <button type="reset" className="btn reset_btn">Reset</button>
              </div>

            </div>


          </div>



        </form>
      </div>




    </>
  )
}

export default FeedbackForm