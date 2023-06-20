import React, { useRef, useContext } from 'react'
import { FormHeading } from "../Generic/FormHeading";
import './../../css/flex.css'
import './../../css/ReuestApproval.css';
import Input from '../Generic/Input';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import { useEffect } from 'react';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import AppContext from '../../context/appState/AppContext';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';


const PayApprove=( props ) => {



  const { approvalRequestCreds, setApprovalRequestCreds,pending,setPending }=props;

  const submitBtnRef=useRef( null )
  const closeBtn=useRef( null )
  const formRef=useRef( null )
  const handleClose=() => {
    formRef.current.reset()
    const btnOuter=$( ".button_outer" );
    $( "#uploaded_view" ).removeClass( "show" );
    $( "#uploaded_view" ).find( "img" ).remove();
    btnOuter.removeClass( "file_uploading" );
    btnOuter.removeClass( "file_uploaded" );
    btnOuter.css( { 'position': '', 'left': '' } )
  }


  const handleOnchange=() => {
    // console.log( btnRef.current )
    // btnRef.current.classList.add( 'file_uploaded' )
    // console.log( btnRef.current.classList )
    // console.log( btnRef.current.classList.contains( 'file_uploading' ) )
    // if ( btnRef.current.classList.contains( 'file_uploading' ) ) {
      //   btnRef.current.style.display='none';
      // }
  }

  const { Cookies }=useContext( UsersContext )
  const { showAlert }=useContext( AppContext );
  


  const cookie=Cookies.get( 'jwt' )

  const handleSubmit=async ( e ) => {


    e.preventDefault();

    // console.log( String( approvalRequestCreds.CNIC )===String( e.target.CNIC.value ) )
    // console.log('hi',approvalRequestCreds.CNIC,e.target.CNIC.value,approvalRequestCreds.firstName,e.target.firstName.value.toLowerCase() );
    if ( approvalRequestCreds.CNIC===e.target.CNIC.value&&approvalRequestCreds.firstName===e.target.firstName.value.toLowerCase() ) {

      console.log(approvalRequestCreds);

      let formData=new FormData();
      formData.append( 'transactionImage', e.target.transactionImage.files[ 0 ] )
      formData.append( 'user', approvalRequestCreds.user );
      formData.append( 'plot', approvalRequestCreds.plot );
      formData.append( 'installment', approvalRequestCreds.installment );


      const res=await Api.post( 'requestapproval',
        formData,
        {
          // withCredentials: true,
          headers: { Authorization: `Bearer ${cookie}` }
        }
      )

      if ( res.data.status==='success' ) {
        closeBtn.current.click();
       setPending(true);
        // showAlert( `Approval request has been submited!`, "success" );
        message.success( 'Approval request has been submited!' );
      }
      else {
        // showAlert( `Something went wrong, please try again later!`, "danger" );
        message.error( 'Something went wrong, please try again later!' );
      }


    }

    else {
      // showAlert( `CNIC or First name is incorrect!`, "danger" );
      message.error( 'CNIC or First name is incorrect!' );

    }


  }


  const uploadFlex=() => {


    const btnUpload=$( "#upload_file" ),
      btnOuter=$( ".button_outer" );
    btnUpload.on( "change", function ( e ) {
      const ext=btnUpload.val().split( '.' ).pop().toLowerCase();
      if ( $.inArray( ext, [ 'gif', 'png', 'jpg', 'jpeg' ] )==-1 ) {
        $( ".error_msg" ).text( "Not an Image..." );
      } else {
        $( ".error_msg" ).text( "" );
        btnOuter.addClass( "file_uploading" );
        setTimeout( function () {
          btnOuter.addClass( "file_uploaded" );
          btnOuter.css( 'position', 'absolute' );
          btnOuter.css( 'left', '-999999999rem' );
        }, 3000 );
        const uploadedFile=URL.createObjectURL( e.target.files[ 0 ] );
        setTimeout( function () {
          $( "#uploaded_view" ).append( '<img src="'+uploadedFile+'" />' ).addClass( "show" );
        }, 3500 );
      }
    } );
    $( ".file_remove" ).on( "click", function ( e ) {
      $( "#uploaded_view" ).removeClass( "show" );
      $( "#uploaded_view" ).find( "img" ).remove();
      btnOuter.removeClass( "file_uploading" );
      btnOuter.removeClass( "file_uploaded" );
      btnOuter.css( { 'position': '', 'left': '' } )


    } );
  }



  useEffect( () => {
    uploadFlex()
  }, [] );
  return (

    <>

      <div>

        <div className="modal fade " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">Pay Installment</h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} ref={closeBtn} />
              </div>
              <div className="modal-body">




                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Pay Installment
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div class="accordion-body text-center">

                        <a href="https://www.facebook.com/" target={'_blank'} type="button" className='btn payment_btn' >Pay with HBL</a>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Upload Transaction image
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                      <div class="accordion-body">

                        <form ref={formRef} onSubmit={handleSubmit}>

                          <div className="container-fluid">

                            <div className="row">

                              <div className="col-6 text-end mt-3">
                                {/*
                                <InputMask mask="99999-9999999-9" maskChar={null} type="text" id="inputCnic" placeholder='Enter CNIC' className='input' autoComplete="off" name="CNIC" style={{ width: "100%" , marginTop:'10rem' }} required />
                                <p className="input_label_l" style={{ width: "100%" }}>CNIC</p> */}

                                <InputMask mask="99999-9999999-9" maskChar={null} type="text" id="inputCnic" autoComplete="off" name="CNIC"  >
                                  {() => <TextField variant="standard" name="CNIC" required className='input' label="Enter CNIC" style={{ width: "100%", marginTop: '10rem' }} />}
                                </InputMask>

                              </div>



                              <div className="col-6 text-end inputBox mt-3">
                                <Input placeholder="Enter firstname" width="100%" name="firstName" type="text" margin="" label='l' labelVal="First Name" />
                              </div>




                              <div className="col-12">
                                <div className="panel">
                                  <div className="button_outer">
                                    {/* <form> */}
                                    <div className="btn_upload">
                                      <input type="file" id="upload_file" name="transactionImage" onChange={handleOnchange} />
                                      Upload Transaction Image
                                    </div>
                                    <div className="processing_bar"></div>

                                    <button className="success_box btn" ref={submitBtnRef}>Submit</button>
                                    {/* </form> */}
                                  </div>
                                </div>
                                <div className="error_msg"></div>
                                <div className="uploaded_file_view" id="uploaded_view">
                                  <span className="file_remove">X</span>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className='text-center'><button type="submit" className="btn btn-dark">Submit</button></div>

                        </form>
                      </div>
                    </div>
                  </div>

                </div>



              </div>

              {/*
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-success">Submit</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default PayApprove;


