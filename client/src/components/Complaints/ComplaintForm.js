import React, { useState, useContext } from 'react'
import Api from '../../Api'
import AppContext from '../../context/appState/AppContext'
import Input from '../Input'
import TextArea from '../Generic/TextArea'
import { FormHeading } from '../FormHeading'








const ComplaintForm=() => {

  const [ complaintFormCred, setComplaintFormCred ]=useState( { name: "", email: "", subject: "", description: "" } )
  const { onChangeGeneric }=useContext( AppContext );
  // const { user }=useContext( UsersContext );

  const onChange=onChangeGeneric( complaintFormCred, setComplaintFormCred );

  const handleSubmit=async ( e ) => {
    e.preventDefault();
    const res=await Api.post( '/complaints', complaintFormCred )
  

  }

  // console.log( user );



  return (
    <>



      <div style={{ margin: "2rem 10rem" }}>
        <div className='my-5'>
          <FormHeading value="Feedback" subHeading="Submit your feedback here" />
        </div>



        <form onSubmit={handleSubmit}>

          <div className="container" >
            <div className="row">

              <div className="col-6">
                <Input placeholder="Name" width="100%" name="name" type="text" onChange={onChange} margin="ml-2" />
              </div>

              <div className="col-6">
                <Input placeholder="Email" width="100%" name="email" type="email" onChange={onChange} />
              </div>

              <div className="col-12">
                <Input placeholder="Subject" width="100%" name="subject" type="text" onChange={onChange} />
              </div>

              <div className="col-12">
                <TextArea placeholder="Description" width="100%" name="description" rows={12} onChange={onChange} />
              </div>

              <div>
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

export default ComplaintForm