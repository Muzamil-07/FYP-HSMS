import React, { useContext, useRef, useState } from 'react'
import SimpleInput from './../Generic/Input'
import Input from './../Generic/EditInput'
import { FormDropdown } from './../Generic/FormDropdown'
import { FormHeading } from './../Generic/FormHeading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../context/appState/AppContext';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import { InputAdornment, IconButton } from "@material-ui/core";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { message } from 'antd';


{/* <i class="fa-solid fa-pen-to-square"></i> */ }



export default function ( props ) {

  const [ errorState, setErrorState ]=useState( false )
  const [ errorMsg, setErrorMsg ]=useState( "" )


  const [ showPassword1, setShowPassword1 ]=useState( false );
  const [ showPassword2, setShowPassword2 ]=useState( false );

  const handleClickPass=() => {
    setShowPassword1( prev => !prev );
  }
  const handleClickConfirmPass=() => {
    setShowPassword2( prev => !prev );
  }


  const { showAlert }=useContext( AppContext );
  const { Cookies }=useContext( UsersContext );
  const closeBtn=useRef( null )


  const handleUserUpdate=async ( e ) => {
    e.preventDefault();
    // console.log( e.target )
    const cookie=Cookies.get( "jwt" );

    if ( props.formVal.password!==props.formVal.passwordConfirm ) {

      setErrorMsg( "Password and Password Confirm are not same" )
      setErrorState( true );


    }
    else {
      try {
        const res=await Api.patch(
          `/users/${props.details._id}`,
          {
            firstName: props.formVal.firstName,
            lastName: props.formVal.lastName,
            CNIC: props.formVal.CNIC,
            email: props.formVal.email,
            password: props.formVal.password,
            passwordConfirm: props.formVal.passwordConfirm,
          },
          {
            headers: { Authorization: `Bearer ${cookie}` },
          }
        );

        if ( res.data.status==="success" ) {
          props.setDetails( res.data.data );
          props.setDisableInputs( true );


          // CHANGES IN FRONTEND
          const USERS=props.users;

          const u=USERS.map( ( el ) => {
            if ( el.id===props.details._id ) {
              return {
                ...props.formVal,
                firstName: props.formVal.firstName,
                lastName: props.formVal.lastName,
                CNIC: props.formVal.CNIC,
                email: props.formVal.email,
                password: props.formVal.password,
                passwordConfirm: props.formVal.passwordConfirm,

              }
            }
            else {
              return el;
            }
          } )
          props.setUsers( u )

          closeBtn.current.click();

          // showAlert( `User has been update successfully!`, "success" );
          message.success( `User has been update successfully!` );
        }

      } catch ( err ) {
        // showAlert( `User not updated! Something went wrong`, "danger" );
        message.error( `User not updated! Something went wrong` );
      }
    }


  };



  return (

    <>
      <div>
        <div
          className="modal fade "
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  User Details
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeBtn}
                />
              </div>
              {<div className="modal-body">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button
                        class="accordion-button "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        User
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div class="accordion-body text-center">
                        <FormHeading value="User Details" />

                        <div className="w-25 ms-auto text-end">
                          <button
                            className=" btn btn-success"
                            onClick={props.handleEdit}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>

                        <form onSubmit={handleUserUpdate}>
                          <div className="container">
                            <div className="row">
                              <div className="col-6 text-end">

                                <Input
                                  placeholder="Enter CNIC"
                                  defaultValue={props.details.CNIC}
                                  width="100%"
                                  name="CNIC"
                                  type="text"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                  mask="99999-9999999-9"
                                />




                                <p
                                  className="input_label_l"
                                  style={{ width: "100%" }}
                                >
                                  CNIC
                                </p>
                              </div>

                              <div className="col-6 inputBox">
                                <Input
                                  placeholder="Enter email"
                                  defaultValue={props.details.email}
                                  width="100%"
                                  name="email"
                                  type="email"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                  df={props.details.email}
                                />
                                <p className="input_label_l">Email</p>
                              </div>

                              <div className="col-6 text-end inputBox ">
                                <Input
                                  placeholder="Enter firstname"
                                  defaultValue={props.details.firstName}
                                  width="100%"
                                  name="firstName"
                                  type="text"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                />
                                <p
                                  className="input_label_l"
                                  style={{ width: "100%" }}
                                >
                                  First name
                                </p>
                              </div>
                              <div className="col-6">
                                <Input
                                  placeholder="Enter lastname"
                                  defaultValue={props.details.lastName}
                                  width="100%"
                                  name="lastName"
                                  type="text"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                />
                                <p className="input_label_l">Last name</p>
                              </div>

                              <div className="col-6 text-end mt-3">
                                {/* <Input
                                  placeholder="Enter Password"
                                  width="100%"
                                  name="password"
                                  type="password"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                  required={false}
                                /> */}
                                <SimpleInput width="100%" name="password" type={showPassword1? "text":"password"} onChange={props.onChange} disabled={props.disableInputs} required={false}
                                  defaultValue={props.formVal.password} label='l' InputProps={{
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
                                <p
                                  className="input_label_l mt-2"
                                  style={{ width: "100%" }}
                                >
                                  Password
                                </p>
                              </div>

                              <div className="col-6  mt-3">
                                {/* <Input
                                  placeholder="Confirm Password"
                                  width="100%"
                                  name="passwordConfirm"
                                  type="password"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                  required={false}
                                /> */}
                                <SimpleInput placeholder="Confirm Password" error={errorState} helperText={errorMsg} width="100%" name="passwordConfirm" type={showPassword2? "text":"password"} onChange={props.onChange}
                                  defaultValue={props.formVal.passwordConfirm} label='r'
                                  disabled={props.disableInputs}
                                  required={false}
                                  InputProps={{
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

                                <p className="input_label_l mt-2">
                                  Confirm Password
                                </p>

                              </div>

                              <div className="text-center mt-2 container">
                                <div className="col-12 text-center">
                                  <button
                                    type="submit"
                                    className="btn form_btn"
                                    disabled={props.disableInputs}
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Plot
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div class="accordion-body">
                        <FormHeading value="Plot Details" />
                        <div className="w-25 ms-auto text-end">
                          <button
                            className=" btn btn-success mb-4"
                            disabled={true}
                            onClick={props.handleEdit}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </div>

                        <form>
                          <div className="container">
                            <div className="row">
                              <div className="col-12 text-center">
                                <FormDropdown
                                  name="plotType"
                                  width="100%"
                                  backgroundColor="#bd960a"
                                  color="white"
                                  onChange={props.onChange}
                                  list={[ "Commercial", "Residential" ]}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].plotType
                                  }
                                />
                              </div>

                              <div className="col-6 mt-2 text-end">
                                <FormDropdown
                                  name="block"
                                  width="100%"
                                  backgroundColor="#bd960a"
                                  color="white"
                                  list={[ "Commercial", "Residential" ]}
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].block
                                  }
                                />
                              </div>

                              <div className="col-6  mt-2">
                                <FormDropdown
                                  name="plotArea"
                                  width="100%"
                                  backgroundColor="#bd960a"
                                  color="white"
                                  list={[ "Commercial", "Residential" ]}
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].plotArea
                                  }
                                />
                              </div>

                              <div className="col-6 text-end mt-3">
                                <Input
                                  placeholder="Enter plot no"
                                  width="100%"
                                  name="plotNo"
                                  type="text"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].plotNo
                                  }
                                  label="l"
                                  labelVal="Plot Number"
                                />
                              </div>

                              <div className="col-6  mt-3">
                                <Input
                                  placeholder="Enter plotPrice"
                                  width="100%"
                                  name="plotPrice"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].plotPrice
                                  }
                                  label="r"
                                  labelVal="Plot Price"
                                />
                              </div>

                              <div className="col-6 text-end ">
                                <Input
                                  placeholder="Enter plot latitude"
                                  width="100%"
                                  name="lat"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].cords[ 0 ].lat
                                  }
                                  label="l"
                                  labelVal="Latitude(Cordinates)"
                                />
                              </div>

                              <div className="col-6  ">
                                <Input
                                  placeholder="Enter plot longitude"
                                  width="100%"
                                  name="lng"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.plotInformation&&
                                    props.details.plotInformation[ 0 ].cords[ 0 ].lng
                                  }
                                  label="r"
                                  labelVal="Longitude(Cordinates)"
                                />
                              </div>

                              <div className="text-center mt-2 container">
                                <div className="col-12 text-center">
                                  <button
                                    type="submit"
                                    disabled={true}
                                    className="btn form_btn"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Installment
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div>
                          <FormHeading value="Installment Details" />
                          <div className="w-25 ms-auto text-end">
                            <button
                              className=" btn btn-success"
                              onClick={props.handleEdit}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />

                            </button>
                          </div>
                        </div>

                        <form>
                          <div className="container">
                            <div className="row">
                              <div className="col-6 mt-4 text-end">
                                <FormDropdown
                                  name="plan"
                                  width="60%"
                                  backgroundColor="#bd960a"
                                  color="white"
                                  list={[ "3 Years", "4 Years", "5 Years" ]}
                                  onChange={props.onChange}
                                  defaultValue={`${props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ]
                                      .totalInstallmentCount/12
                                    } years`}
                                  disabled={true}
                                />
                              </div>

                              <div className="col-6  mt-3 ">
                                <Input
                                  placeholder="Total amount"
                                  width="60%"
                                  name="totalAmount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].totalAmount
                                  }
                                  label="r"
                                  labelVal="Total Installment Amount"
                                />
                              </div>

                              <div className="col-6  text-end">
                                <Input
                                  placeholder="Possession amount"
                                  width="60%"
                                  name="possessionAmount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].possesionAmount
                                  }
                                  label="l"
                                  labelVal="Possession rate"
                                />
                              </div>

                              <div className="col-6  ">
                                <Input
                                  placeholder="Installment per month"
                                  width="60%"
                                  name="installmentPerMonth"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ]
                                      .installmentPerMonth
                                  }
                                  label="r"
                                  labelVal="Per Month Installment"
                                />
                              </div>

                              <div className="col-6   text-end">
                                <Input
                                  placeholder="Ballot amount"
                                  width="60%"
                                  name="ballotAmount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].ballotAmount
                                  }
                                  label="l"
                                  labelVal="Ballot Amount"
                                />
                              </div>

                              <div className="col-6   ">
                                <Input
                                  placeholder="Booking amount"
                                  width="60%"
                                  name="bookingAmount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].bookingAmount
                                  }
                                  label="r"
                                  labelVal="Booking Price"
                                />
                              </div>

                              <div className="col-6   text-end">
                                <Input
                                  placeholder="Half year payment"
                                  width="60%"
                                  name="halfYearPayment"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].halfYearPayment
                                  }
                                  label="l"
                                  labelVal="Half Year Payment"
                                />
                              </div>

                              <div className="col-6   ">
                                <Input
                                  placeholder="Total installment"
                                  width="60%"
                                  name="totalInstallmentCount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ]
                                      .totalInstallmentCount
                                  }
                                  label="r"
                                  labelVal="Total Installments"
                                />
                              </div>

                              <div className="col-6 text-end  ">
                                <Input
                                  placeholder="Remaining installment amount"
                                  width="60%"
                                  name="remainAmount"
                                  type="number"
                                  onChange={props.onChange}
                                  disabled={true}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    props.details.installmentPlan[ 0 ].remainingBalance
                                  }
                                  label="l"
                                  labelVal="Remaining installment amount"
                                />
                              </div>

                              <div className="col-6  ">
                                <Input
                                  placeholder="Total installment"
                                  width="60%"
                                  name="startDate"
                                  type="date"
                                  onChange={props.onChange}
                                  disabled={props.disableInputs}
                                  defaultValue={
                                    props.details.installmentPlan&&
                                    new Date( props.details.installmentPlan[ 0 ].dueDate )
                                      .toISOString()
                                      .split( "T" )[ 0 ]
                                  }
                                  label="r"
                                  labelVal="Installment Start Date"
                                />
                              </div>

                              <div className="text-center mt-5 container">
                                <div className="col-12 text-center">
                                  <button
                                    type="submit"
                                    disabled={props.disableInputs}
                                    className="btn form_btn"
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
