import React, { useContext, useState,useEffect, useCallback } from 'react';
import UsersContext from '../../context/users/UsersContext'; 
import { Button, Row,Statistic } from 'antd';

import DataTableComp from './DataTableComp';
import{ FormHeading} from '../Generic/FormHeading'
import '../../css/installment.css';
import PayApprove from './PayApprove';
import AppContext from '../../context/appState/AppContext';
import jwtDecode from 'jwt-decode';
import InstallmentTable from './InstallmentTable';
import PossessionModal from './PossessionModal'
import BallotModal from './BallotModal'



export default function Installments() {
  
  const { getUserInstallment ,Cookies,user}=useContext( UsersContext );
  const [installmentPlan,setInstallmentPlan]=useState();
  const [pending,setPending]=useState(false);
  const [ approvalRequestCreds, setApprovalRequestCreds ]=useState( {
        user: user.id,
        CNIC: user.CNIC,
        firstName: user.firstName.toLowerCase()
    } )
  
  const { onChangeGeneric }=useContext( AppContext );
  // const onChange=onChangeGeneric( approvalRequestCreds, setApprovalRequestCreds )



  
  useEffect( ()=>{
    
    if ( Cookies.get( 'jwt' ) ) {
      const userId=jwtDecode( Cookies.get( 'jwt' ) ).id;
      getUserInstallment( userId ).then((res)=>{
      
       console.log(res);
       setInstallmentPlan(res[0])
       setApprovalRequestCreds({...approvalRequestCreds,installment: res[0].id,
        plot: res[0].plot,})
      });
    }


  },[pending])
  


  return (
    installmentPlan ? <>
     <FormHeading value="Installment"/>
      {/* <Row align='center' style={{ marginTop:'3rem'}}> */}
      <div className="row mx-auto" style={{ width: "90%" }}>

        <div className="col-md-3 col-6 ">
          <Statistic
            style={{
              margin: '0 10px',
            }} title="Total" prefix="Rs." value={installmentPlan.totalAmount} />
        </div>

        <div className="col-md-3 col-6 ">

          <Statistic
            title="Remaining"
            prefix="Rs."
            value={installmentPlan.remainingBalance}
            style={{
              margin: '0 10px',
            }}
          />
        </div>


        <div className="col-md-3 mt-2 col-6">
          <Statistic style={{
            margin: '0 10px',
          }} title="Balloting" prefix="Rs." value={installmentPlan.ballotAmount} />
        </div>


        <div className="col-md-3  mt-2 col-6">
          <Statistic style={{
            margin: '0 10px',
          }} title="Possession" prefix="Rs." value={installmentPlan.possesionAmount} />


        </div>







      </div>

      {/* </Row> */}

    {/* <div className="row installmentRow">
      <div className="col-6 installmentLeft">
          <span className='installmentSubheading'>Total: </span> <span className='installmenSubheadingValue'>{installmentPlan.totalAmount} <small className="fw-bold"> PKR</small> </span>
      </div>
      <div className="col-6 installmentRight">
          <span className='installmentSubheading'>Remaining: </span> <span className='installmenSubheadingValue'>{installmentPlan.remainingBalance}<small className="fw-bold"> PKR</small></span>
      </div>
    </div> */}



      {/* Installment */}
      <PayApprove approvalRequestCreds={approvalRequestCreds} setApprovalRequestCreds={setApprovalRequestCreds} pending={pending} setPending={setPending}/>
      <PossessionModal approvalRequestCreds={approvalRequestCreds} setApprovalRequestCreds={setApprovalRequestCreds} pending={pending} setPending={setPending}/>
      <BallotModal approvalRequestCreds={approvalRequestCreds} setApprovalRequestCreds={setApprovalRequestCreds} pending={pending} setPending={setPending}/>
 
    {/* <DataTableComp installmentPlan={installmentPlan} pending={pending} setPending={setPending} key={pending} /> */}
      <div className='p-sm-5 mt-3 table_table'>
      <div className='text-end'>
    <Button data-bs-toggle="modal" data-bs-target="#BallotModal">Pay Ballot</Button>
    <Button data-bs-toggle="modal" data-bs-target="#PossessionModal">Pay Possession</Button>
      </div>
    <InstallmentTable  installmentPlan={installmentPlan} pending={pending} setPending={setPending} key={pending}  />
    
    </div>
    </>:<div className='text-center'> <div className="spinner-grow" style={{ width: "5rem", height: '5rem', marginTop: "11rem" }} role="status">

    </div><div className="" style={{ fontSize: "12px" }}>Loading...</div></div>
    )
}
