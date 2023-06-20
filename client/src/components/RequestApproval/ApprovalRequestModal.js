import React, { useEffect, useContext, useRef } from 'react'
import '../../css/ApprovalRequestModal.css'
import BoxInput from '../Generic/BoxInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import AppContext from '../../context/appState/AppContext';
import Confirmation from '../Welcome/Confirmation';
import { message } from 'antd';



const ApprovalRequestModal=( props ) => {

  const closeBtn=useRef( null )

  const { user, Cookies }=useContext( UsersContext );
  const { showAlert }=useContext( AppContext );

  const { data, setModalData, completeData, setRequests, setTableData, tableData }=props;

  // REJECT APPROVAL REQUEST
  const handleRejectEvent=async ( e ) => {
    e.preventDefault();
    const cookie=Cookies.get( 'jwt' )
    const id=data.id;

    // DELETING DATA FROM ARRAY
    const arr=tableData;
    console.log( tableData )
    const newData=arr.filter( el => {
      return el.id!==id;
    } );


    // console.log( newData );

    setRequests( newData );
    closeBtn.current.click()

    // DELETING DATA FROM BACKEND
    // const cookie=Cookies.get( 'jwt' );
    try {
      const res=await Api.delete( `requestapproval/${id}`,
        {
          headers: { Authorization: `Bearer ${cookie}` }
        } )

      // showAlert( "Request has been rejected", 'success' );
      message.success( "Request has been rejected" );


    } catch ( error ) {
      // showAlert( 'Something went wrong!', 'danger' )
      message.error( 'Something went wrong!' )
    }





  }

  // ACCEPT APPROVAL REQUEST
  const handleAcceptEvent=async ( e ) => {
    e.preventDefault();


    const cookie=Cookies.get( 'jwt' )
    const id=data.id;



    // DELETING DATA FROM BACKEND
    // const cookie=Cookies.get( 'jwt' );
    try {
      // const res=await Api.patch( `requestapproval/${data.id}`, {
      const res=await Api.patch( `requestapproval/${data.installment.id}`, {

      },
        {
          headers: { Authorization: `Bearer ${cookie}` }
        } )

      if ( res.data.status==='success' ) {
        // DELETING DATA FROM ARRAY
        const arr=tableData;
        const newData=arr.filter( el => {
          return el.id!==id;
        } );
        setRequests( newData );
        closeBtn.current.click();
        // showAlert( "Request has been approved", 'success' );
        message.success( "Request has been approved" );

      }



    } catch ( error ) {
      // showAlert( error.response.data.message, 'danger' )
      message.error( error.response.data.message )
    }




  }


  return (
    <>
      {/* <div>ApprovalRequestModal</div> */}


      {data.id&&
        <div className="modal fade  " id="approvalRequestModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">Request Approval Reciept</h5>

                <button type="button" className="btn-close" ref={closeBtn} data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">


                <div className="row">

                  <div className="col-md-6">
                    <BoxInput heading="Name" value={data.user.firstName+" "+data.user.lastName} icon={<FontAwesomeIcon icon={faUser} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="CNIC" value={data.user.CNIC} icon={<FontAwesomeIcon icon={faIdCard} />} />
                  </div>


                  <div className="col-md-6">
                    <BoxInput heading="Plan" value={data.installment.plan} icon={<FontAwesomeIcon icon={faBusinessTime} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Block" value={data.plot.block} icon={<FontAwesomeIcon icon={faMapMarkedAlt} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Plot No" value={data.plot.plotNo} icon={<FontAwesomeIcon icon={faBookOpen} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Plot Area" value={data.plot.plotArea} icon={<FontAwesomeIcon icon={faMountain} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Installment/month" value={data.installment.installmentPerMonth} icon={<FontAwesomeIcon icon={faCashRegister} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Amount Paid" value={data.installment.total} icon={<FontAwesomeIcon icon={faMoneyBill} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Installment" value={`${data.installment.installmentCount+1}/${data.installment.totalInstallmentCount}`} icon={<FontAwesomeIcon icon={faCheckDouble} />} />
                  </div>

                  <div className="col-md-6">
                    <BoxInput heading="Due Date" value={new Date( data.installment.dueDate ).toDateString()} icon={<FontAwesomeIcon icon={faCalendarDays} />} />
                  </div>



                  <div className='col-12 text-center'>
                    <h4 className='transaction_image_head'>Transaction Image</h4>
                  </div>

                  <div className="col-12 text-center">

                    {/* <img src={require( `./../../../alkareemcity/img/transactions/${data.transactionImage}` )} alt="transaction img" className='img-fluid' /> */}
                  </div>


                </div>


              </div>




              <div className="modal-footer">

                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmation"  ><FontAwesomeIcon icon={faTrashCan} /> <span className='ms-2'>Reject</span> </button>


                <button type="button" className="btn btn-success" onClick={handleAcceptEvent}><FontAwesomeIcon icon={faCircleCheck} /> <span className='ms-2'>Accept</span></button>


              </div>

            </div>
          </div>
        </div>



      }
      <Confirmation handleClick={handleRejectEvent} />
    </>

  )
}

export default ApprovalRequestModal