import React, { useRef, useEffect, useState, useContext } from 'react';
// import React, { useState, useContext } from 'react'
import AppContext from '../../context/appState/AppContext';
import { FormHeading } from '../Generic/FormHeading';
import Input from '../Generic/Input';
import InputMask from 'react-input-mask';
import UserForm from '../Forms/UserForm';
import PlotForm from '../Forms/PlotForm';
import InstallmentForm from '../Forms/InstallmentForm';
import Success from '../Forms/Success';
import PrintComponent from '../Forms/PrintComponent';

const CreateUser=() => {





  const { onChangeGeneric }=useContext( AppContext );



  const [ formVal, setFormVal ]=useState( {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    CNIC: '',
    userId: '',
    phone: '',

    plotNo: '',
    plotPrice: '',
    block: '',
    lat1: '',
    lng1: '',
    lat2: '',
    lng2: '',
    lat3: '',
    lng3: '',
    lat4: '',
    lng4: '',
    plotArea: '',
    plotType: '',
    plotId: '',

    plan: '',
    totalAmount: '',
    possessionAmount: '',
    installmentPerMonth: '',
    ballotAmount: '',
    bookingAmount: '',
    halfYearPayment: '',
    totalInstallmentCount: '',
    planStartDate: ''


  } )

  //*******  Proceed to next step
  const nextStep=() => {

    const { step }=formVal;
    setFormVal( { ...formVal, step: step+1 } )


  }


  //*******  Proceed to previous step
  const previousStep=() => {

    const { step }=formVal;


    setFormVal( { ...formVal, step: step-1 } )
  }


  // *******  on change fields event handler
  const onChange=onChangeGeneric( formVal, setFormVal );


  //?  status to check if user has created successfully (success,fail)
  const [ userFormStatus, setUserFormStatus ]=useState( "fail" );
  const [ plotFormStatus, setPlotFormStatus ]=useState( "fail" );
  const [ installmentFormStatus, setInstallmentFormStatus ]=useState( "fail" );


  const { step }=formVal;

  const { firstName, lastName, email, CNIC, password, passwordConfirm, phone }=formVal;
  const { plotNo, plotPrice, lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4, block, plotArea, plotType }=formVal;


  const { plan, totalAmount, possessionAmount, installmentPerMonth, ballotAmount, bookingAmount, halfYearPayment, totalInstallmentCount, planStartDate }=formVal;

  const values1={ firstName, lastName, email, CNIC, password, passwordConfirm, phone }
  const values2={ plotNo, plotPrice, lat1, lng1, lat2, lng2, lat3, lng3, lat4, lng4, block, plotArea, plotType }
  const values3={ plan, totalAmount, possessionAmount, installmentPerMonth, ballotAmount, bookingAmount, halfYearPayment, totalInstallmentCount, planStartDate }

  switch ( step ) {
    case 1:
      return (
        <UserForm onChange={onChange} values={values1} nextStep={nextStep} userFormStatus={userFormStatus} setUserFormStatus={setUserFormStatus} formVal={formVal} setFormVal={setFormVal} />
      )
    case 2:
      return ( <PlotForm onChange={onChange} values={values2} nextStep={nextStep} plotFormStatus={plotFormStatus} setPlotFormStatus={setPlotFormStatus} previousStep={previousStep} setFormVal={setFormVal} formVal={formVal} /> )
    case 3:
      return ( <InstallmentForm onChange={onChange} values={values3} nextStep={nextStep} installmentFormStatus={installmentFormStatus} setInstallmentFormStatus={setInstallmentFormStatus} previousStep={previousStep} setFormVal={setFormVal} formVal={formVal} /> );
    case 4:
      return ( <PrintComponent formVal={formVal} setFormVal={setFormVal} userFormStatus={userFormStatus} plotFormStatus={plotFormStatus} installmentFormStatus={installmentFormStatus} nextStep={nextStep} previousStep={previousStep} /> )
    // return ( <Success formVal={formVal} userFormStatus={userFormStatus} plotFormStatus={plotFormStatus} installmentFormStatus={installmentFormStatus} nextStep={nextStep} previousStep={previousStep} /> )

  }

}

export default CreateUser