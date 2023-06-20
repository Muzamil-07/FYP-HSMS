import React, { useContext, useState } from 'react'
import Input from '../Generic/Input';
import { FormHeading } from '../Generic/FormHeading';
import { FormDropdown } from '../Generic/FormDropdown';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import AppContext from '../../context/appState/AppContext';
import { Button } from 'antd';
import { message } from 'antd';

const InstallmentForm=( props ) => {
  const { values, onChange, nextStep, previousStep, formVal, setFormVal, installmentFormStatus, setInstallmentFormStatus }=props;


  const { showAlert, setAlert }=useContext( AppContext );
  const { Cookies }=useContext( UsersContext );
  const [ loading, setLoading ]=useState( false )
  // plan: '',
  //   totalAmount: '',
  //     possessionAmount: '',
  //       installmentPerMonth: '',
  //         ballotAmount: '',
  //           bookingAmount: '',
  //             halfYearPayment: '',
  //               totalInstallmentCount: ''


  const moveToNext=( e ) => {
    e.preventDefault();
    nextStep();
  }

  const moveToBack=( e ) => {
    e.preventDefault();
    previousStep();
  }


  const handleInstallmentFormSubmit=async ( e ) => {
    e.preventDefault();


    const cookie=Cookies.get( 'jwt' );

    const data={
      plan: values.plan,
      totalAmount: values.totalAmount,
      possesionAmount: values.possessionAmount,
      planStartDate: values.planStartDate,
      totalInstallmentCount: values.totalInstallmentCount,
      installmentPerMonth: values.installmentPerMonth,
      ballotAmount: formVal.ballotAmount,
      bookingAmount: values.bookingAmount,
      halfYearPayment: values.halfYearPayment,
      plot: formVal.plotId,
      user: formVal.userId

    };


    try {

      let res;
      if ( !formVal.installmentId ) {
        res=await Api.post( 'installment',
          data,
          {
            // withCredentials: true,
            headers: { Authorization: `Bearer ${cookie}` }
          }
        )

      } else {

        res=await Api.patch( `installment/${formVal.installmentId}`,
          data,
          {
            // withCredentials: true,
            headers: { Authorization: `Bearer ${cookie}` }
          }
        )
      }
      if ( res.data.status==="success" ) {
        setLoading( false );

        // showAlert( `Installment plan has been ${formVal.installmentId? 'updated':'created'} for the user successfully!`, "success" );
        message.success( `Installment plan has been ${formVal.installmentId? 'updated':'created'} for the user successfully!` );

        setInstallmentFormStatus( res.data.status );
        setFormVal( { ...formVal, installmentId: res.data.data.id } )

      }





    } catch ( error ) {
      setLoading( false );

      console.log( error );
      // showAlert( "Something went wrong! Please try again later", "danger" );
      message.error( "Something went wrong! Please try again later" );
    }
  }





  return (
    <div>

      <div className='mb-3'>
        <FormHeading value="Installment Detail"  subHeading="Fill out all the installment details"/>
      </div>

      <form onSubmit={handleInstallmentFormSubmit}>

        <div className="container" >
          <div className="row">



            <div className="col-6 mt-4 text-end">
              <FormDropdown name='plan' width='60%' backgroundColor='#bd960a' color='white' list={[ '3 Years', '4 Years', '5 Years' ]} onChange={onChange} formVal={formVal} setFormVal={setFormVal} defaultValue={values.plan} />
            </div>

            <div className="col-6  mt-3 ">
              <Input placeholder="Total amount" width="60%" name="totalAmount" label='r' type="number" onChange={onChange} defaultValue={values.totalAmount} labelVal="Total Installment Amount" />
            </div>

            <div className="col-6  text-end">
              <Input placeholder="Possession amount" width="60%" name="possessionAmount" label='l' type="number" onChange={onChange} defaultValue={values.possessionAmount} labelVal="Possession rate" />
            </div>

            <div className="col-6  ">
              <Input placeholder="Installment per month" width="60%" name="installmentPerMonth" label='r' type="number" onChange={onChange} defaultValue={values.installmentPerMonth} labelVal="Per Month Installment" />
            </div>

            <div className="col-6   text-end">
              <Input placeholder="Ballot amount" width="60%" name="ballotAmount" label='l' type="number" onChange={onChange} defaultValue={values.ballotAmount} labelVal="Ballot Amount" />
            </div>

            <div className="col-6   ">
              <Input placeholder="Booking amount" width="60%" name="bookingAmount" label='r' type="number" onChange={onChange} defaultValue={values.bookingAmount} labelVal="Booking Price" />
            </div>

            <div className="col-6   text-end">
              <Input placeholder="Half year payment" width="60%" name="halfYearPayment" label='l' type="number" onChange={onChange} defaultValue={values.halfYearPayment} labelVal="Half Year Payment" />
            </div>

            <div className="col-6   ">
              <Input placeholder="Total installment" width="60%" name="totalInstallmentCount" label='r' type="number" onChange={onChange} defaultValue={values.totalInstallmentCount} labelVal="Total Installments" />
            </div>

            {/* <div className="col-6 text-end  ">
              <Input placeholder="Remaining installment amount" width="60%" name="remainingBalance" label='l' type="number" onChange={onChange} defaultValue={values.remainingBalance} labelVal="Remaining installment amount" />
            </div> */}

            <div className="col-12 text-center ">
              <Input placeholder="Select plan start date" width="60%" name="planStartDate" label='c' type="date" onChange={onChange} defaultValue={values.planStartDate} labelVal="Installment Start Date" />
            </div>



            {/* <div className='text-center container ' style={{ marginTop: "6rem", marginBottom: '2rem' }}> */}
            {/* <button className="btn reset_btn_outline btn-outline-dark mx-2" onClick={moveToBack}>Back</button> */}
            {/* <button className="btn form_btn me-4 mx-2" onClick={moveToNext} disabled={!values.plotNo||!values.plotPrice||!values.lat||!values.lng||!values.block||!values.area}>Next</button> */}
            {/* </div> */}


            <div className='text-center mt-5 container'>

              <div className="col-12 text-center">

                <Button className="btn reset_btn_outline btn-outline-dark mx-2" onClick={moveToBack}>Back</Button>

                <Button

                  loading={loading}
                  onClick={() => setLoading( true )}
                  type='submit' className="btn form_btn" disabled={!values.plan||!values.totalAmount||!values.possessionAmount||!values.installmentPerMonth||!values.ballotAmount||!values.bookingAmount||!values.halfYearPayment||!values.totalInstallmentCount}
                  htmlType="submit"

                >
                  {formVal.installmentId? 'Update':'Submit'}

                </Button>

              </div>


              <div className="col-12 text-end mb-3">
                {/* <button className="btn form_btn me-4 mx-2" onClick={moveToNext} disabled={!values.plotNo||!values.plotPrice||!values.lat||!values.lng||!values.block||!values.area}>Next</button> */}
                <button className="btn form_next_btn " disabled={installmentFormStatus==='fail'? true:false} onClick={moveToNext}> next <span className='right_arrow'>&#8594;</span></button>

              </div>

            </div>

          </div>


        </div>



      </form>
    </div>

  )
}

export default InstallmentForm