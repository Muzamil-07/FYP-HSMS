import React from 'react'
import Api from '../../Api';
import emailjs from '@emailjs/browser';
import { FormHeading } from '../Generic/FormHeading'
import Cookies from 'js-cookie';
import { Button } from 'antd';

class Success extends React.Component {

  state={
    loading: false
  }
  render() {

    const moveToBack=( e ) => {
      e.preventDefault();
      this.props.previousStep();

    }

    const finishIt=async () => {

      this.setState( { loading: true } )

      let invoiceNo = Math.floor(1000 + Math.random() * 9000);

      const res=await Api.patch( `/users/publish/${this.props.values.userId}`,
        { plotNo: this.props.values.plotNo },
        { headers: { Authorization: `Bearer ${Cookies.get( 'jwt' )}` } }
      )
      await emailjs.send( 'service_6tkhh5s', 'template_ke2hq8h', {
          invoiceNo,
          invoiceDate: new Date().toDateString(),
          email: this.props.values.email,
          password: this.props.values.password,
          plotNo: this.props.values.plotNo,
          block: this.props.values.block,
          plotPrice: this.props.values.plotPrice,
          plotArea: this.props.values.plotArea,
          plan: this.props.values.plan,
          bookingAmount: this.props.values.bookingAmount,
          ballotAmount: this.props.values.ballotAmount,
          installmentPerMonth: this.props.values.installmentPerMonth,
          halfYearPayment: this.props.values.halfYearPayment,
          planStartDate: this.props.values.planStartDate
          
          }, 'G3SQs4EJPCv8WQlOP' )
      if ( res.data.status==="success" ) {
        this.setState( { loading: false } )


        this.props.setFormVal( {


          step: 1,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
          CNIC: '',
          userId: '',

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
          remainingBalance: '',
          planStartDate: ''


        } )

      }



    }


    return (
      <>


        <div className="container">
          <FormHeading value="User Details" />
          <div className="row my-3">

            <div className="col-6">
              <p>Name:</p>
            </div>

            <div className="col-6">
              <p> {this.props.values.firstName+" "+this.props.values.lastName}</p>
            </div>

            <div className="col-6">
              <p>CNIC:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.CNIC}</p>
            </div>

            <div className="col-6">
              <p>Email:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.email}</p>
            </div>

            <div className="col-6">
              <p>Password:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.password}</p>
            </div>


          </div>


          <hr className='mb-5' />

          <FormHeading value="Plot Details" />
          <div className="row my-3">
            <div className="col-6">
              <p>Block:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.block}</p>
            </div>

            <div className="col-6">
              <p>Plot No:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.plotNo}</p>
            </div>

            <div className="col-6">
              <p>Plot Price:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.plotPrice}</p>
            </div>

            <div className="col-6">
              <p>Plot Area:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.plotArea}</p>
            </div>

          </div>

          <hr className='mb-5' />

          <FormHeading value="Installment Details" />

          <div className="row my-3">

            <div className="col-6">
              <p>Plan:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.plan}</p>
            </div>

            <div className="col-6">
              <p>Booking Amount:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.bookingAmount}</p>
            </div>

            <div className="col-6">
              <p>Balloting Amount:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.ballotAmount}</p>
            </div>

            <div className="col-6">
              <p>Installment Per Month:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.installmentPerMonth}</p>
            </div>

            <div className="col-6">
              <p>Half Year Payment:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.halfYearPayment}</p>
            </div>

            <div className="col-6">
              <p>Half Year Payment:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.halfYearPayment}</p>
            </div>

            <div className="col-6">
              <p>Plan Start From:</p>
            </div>

            <div className="col-6">
              <p>{this.props.values.planStartDate}</p>
            </div>





          </div>


        </div>





        <div className='text-center my-4 container'>

          <Button className="btn reset_btn_outline btn-outline-dark mx-2" onClick={moveToBack}>Back</Button>

          <Button
            loading={this.state.loading}
            className="btn form_btn mx-2" onClick={finishIt}
            htmlType="submit"

          >
            Finish
          </Button>


        </div>

      </>
    )

  }
}


export default Success