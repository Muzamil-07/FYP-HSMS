import React from 'react'
import Input from '../Generic/EditInput'
import { FormHeading } from '../Generic/FormHeading'
import { useState, useContext, useEffect } from 'react';
import UsersContext from '../../context/users/UsersContext';
import Api from '../../Api';
import './../../css/Profile.css'
import { Card } from 'antd';
const { Meta }=Card;

export default function Profile() {
  const [ profile, setProfile ]=useState( null );
  const { user, Cookies }=useContext( UsersContext );

  const getProfile=async () => {
    const cookie=Cookies.get( "jwt" );

    const res=await Api.get( `/users/${user.id}`, {

      headers: { Authorization: `Bearer ${cookie}` }

    } )
    setProfile( res.data.data )
  }
  useEffect( () => {
    getProfile()
  }, [] );
  return (

    <>
      {
        profile!==null?
    <div className='profile_container'>

            {/* <div >
        <FormHeading value="My Profile" />
      </div> */}

            {/* <div className="col-8 text-center mx-auto">
        <img src={require( './../../profilePic.png' )} className='img-fluid' alt="" />
      </div> */}

            <Card
              hoverable
              style={{
                width: 370,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              cover={<img src={require( './../../profilePic.png' )} className='img-fluid' alt="" />}
            >
              <div className='text-center'>
                <Meta title={profile.firstName+" "+profile.lastName} description={profile.email} />
              </div>

              <div className='text-center mt-4'>
                <Meta title="Phone" description={profile.phone} />
              </div>

              <div className='text-center mt-4'>
                <Meta title="CNIC" description={profile.CNIC} />
              </div>


              {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
            </Card>

            {/* <form>

        <div className="container" >
          <div className="row">


            <div className="col-6 text-end mt-3">


              <Input placeholder="" width="60%" name="cnic" defaultValue={profile.CNIC} type="text" margin="" label='l' labelVal="CNIC" disabled={true} />

            </div>

            <div className="col-6 inputBox mt-3">
              <Input placeholder="" width="60%" name="email" defaultValue={profile.email} type="email" margin="" label='r' labelVal="Email Address" disabled={true} />

            </div>

            <div className="col-6 text-end inputBox mt-3">
              <Input placeholder="Enter firstname" width="60%" name="firstName" defaultValue={profile.firstName} type="text" label='l' labelVal="First Name" disabled={true} />
            </div>

            <div className="col-6 mt-3">
              <Input placeholder="Enter lastname" width="60%" name="lastName" type="text" disabled={true} defaultValue={profile.lastName} label='r' labelVal="Last Name" />
            </div>






          </div>

        </div>





      </form>
       */}
          </div>:<div className='text-center'> <div className="spinner-grow" style={{ width: "5rem", height: '5rem', marginTop: "11rem" }} role="status">

          </div><div className="" style={{ fontSize: "12px" }}>Loading...</div></div>
      }
    </>
  )
}