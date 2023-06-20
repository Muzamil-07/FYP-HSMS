import React, { useEffect, useRef, useContext, useState } from 'react'
import Input from '../Generic/Input';
import { FormHeading } from '../Generic/FormHeading';
import { FormDropdown } from '../Generic/FormDropdown';
import Api from '../../Api';
import UsersContext from '../../context/users/UsersContext';
import AppContext from '../../context/appState/AppContext';
import { Button } from 'antd';
import { message } from 'antd';

const PlotForm=( props ) => {

  const { values, onChange, nextStep, previousStep, formVal, setFormVal, setPlotFormStatus, plotFormStatus }=props;

  const { showAlert, setAlert }=useContext( AppContext );
  const { Cookies }=useContext( UsersContext );

  const [ loading, setLoading ]=useState( false )

  const moveToNext=( e ) => {
    e.preventDefault();
    nextStep();
  }

  const moveToBack=( e ) => {
    e.preventDefault();
    previousStep();
  }

  const handlePlotFormSubmit=async ( e ) => {
    e.preventDefault();


    const cookie=Cookies.get( 'jwt' );

    const data={
      plotNo: values.plotNo,
      plotType: values.plotType,
      plotPrice: values.plotPrice,
      block: values.block,
      plotArea: values.plotArea,
      cords:[
        {
        lat:formVal.lat1,
        lng:formVal.lng1,
        },
        {
        lat:formVal.lat2,
        lng:formVal.lng2,
        },
        {
        lat:formVal.lat3,
        lng:formVal.lng3,
        },
        {
        lat:formVal.lat4,
        lng:formVal.lng4,
        },
      ],
      user: formVal.userId,
    };


    try {

      let res;
      if ( !formVal.plotId ) {
        res=await Api.post( 'plots',
          data,
          {
            // withCredentials: true,
            headers: { Authorization: `Bearer ${cookie}` }
          }
        )

      } else {

        res=await Api.patch( `plots/${formVal.plotId}`,
          data,
          {
            // withCredentials: true,
            headers: { Authorization: `Bearer ${cookie}` }
          }
        )
      }

      if ( res.data.status==="success" ) {
        setLoading( false );

        // showAlert( `Plot has been ${formVal.plotId? 'updated':'created'} for the user successfully!`, "success" );

        message.success( `Plot has been ${formVal.plotId? 'updated':'created'} for the user successfully!` );

        setPlotFormStatus( res.data.status );
        setFormVal( { ...formVal, plotId: res.data.data.id ,cords:[
        {
        lat:formVal.lat1,
        lng:formVal.lng1,
        },
        {
        lat:formVal.lat2,
        lng:formVal.lng2,
        },
        {
        lat:formVal.lat3,
        lng:formVal.lng3,
        },
        {
        lat:formVal.lat4,
        lng:formVal.lng4,
        },
      ]} )

      }





    } catch ( error ) {
      setLoading( false );

      console.log( error );
      // showAlert( "Something went wrong! Please try again later", "danger" );
      message.error( "Something went wrong! Please try again later" );
    }
  }

  const formRef=useRef( null )

  const residentialPlotArea=[ '3 Marla', '5 Marla', '7 Marla', '10 Marla', '18 Marla', '1 Kanal' ];
  const residentialBlocks=[ 'Abu Bakar Block', 'Usman Block', 'Umer Block', 'Ali Block' ]

  const commercialPlotArea=[ '2 Marla', '4 Marla', '5 Marla' ];
  const commercialBlocks=[ 'Broad Way Block', 'High Way Block', 'Park Square Block', 'Omer Block' ];

  // const cat=values.category;
  useEffect( () => {

    // setFormVal( { ...formVal, block: '', plotArea: '', plotNo: '', plotPrice: '', lat: '', lng: '' } )
    // formRef.current.reset();

  }, [ values.plotType ] )



  return (
    <div>

      <div className='mb-2'>
        <FormHeading value="Plot Details" subHeading="Select the plot catgeory and then fill out the information" />
      </div>

      <form ref={formRef} onSubmit={handlePlotFormSubmit}>

        <div className="container" >
          <div className="row">


            <div className="col-12 text-center">
              <FormDropdown name='plotType' width='60%' backgroundColor='#bd960a' color='white' list={[ 'Commercial', 'Residential' ]} onChange={onChange} formVal={formVal} setFormVal={setFormVal} formRef={formRef} defaultValue={values.plotType} />
            </div>


            <div className="col-6 mt-2 text-end">
              <FormDropdown name='block' width='60%' backgroundColor='#bd960a' color='white' list={values.category==='commercial'? commercialBlocks:residentialBlocks} onChange={onChange} formVal={formVal} setFormVal={setFormVal} defaultValue={values.block} />
            </div>

            <div className="col-6  mt-2">
              <FormDropdown name='plotArea' width='60%' backgroundColor='#bd960a' color='white' list={values.category==='commercial'? commercialPlotArea:residentialPlotArea} onChange={onChange} formVal={formVal} setFormVal={setFormVal} defaultValue={values.plotArea} />
            </div>

            <div className="col-6 text-end mt-3">
              <Input placeholder="Enter plot no" width="60%" label='l' name="plotNo" type="text" onChange={onChange} margin="" defaultValue={values.plotNo} labelVal="Plot No" />
            </div>


            <div className="col-6  mt-3">
              <Input placeholder="Enter plotPrice" width="60%" label='r' name="plotPrice" type="number" onChange={onChange} margin="" defaultValue={values.plotPrice} labelVal="Plot Price" step="any" />
            </div>



            <div className="col-6 text-end ">
              <Input placeholder="Enter latitude of 1st corner" width="60%" label='l' name="lat1" type="number" onChange={onChange} defaultValue={values.lat1} labelVal="Latitude(Cordinates)" step="any" />
            </div>

            <div className="col-6  ">
              <Input placeholder="Enter longitude of 1st corner" width="60%" label='r' name="lng1" type="number" onChange={onChange} defaultValue={values.lng1} labelVal="Longitude(Cordinates)" step="any" />
            </div>

            <div className="col-6 text-end ">
              <Input placeholder="Enter latitude of 2nd corner" width="60%" label='l' name="lat2" type="number" onChange={onChange} defaultValue={values.lat2} labelVal="Latitude(Cordinates)" step="any" />
            </div>

            <div className="col-6  ">
              <Input placeholder="Enter longitude of 2nd corner" width="60%" label='r' name="lng2" type="number" onChange={onChange} defaultValue={values.lng2} labelVal="Longitude(Cordinates)" step="any" />
            </div>

            <div className="col-6 text-end ">
              <Input placeholder="Enter latitude of 3rd corner" width="60%" label='l' name="lat3" type="number" onChange={onChange} defaultValue={values.lat3} labelVal="Latitude(Cordinates)" step="any" />
            </div>

            <div className="col-6">
              <Input placeholder="Enter longitude of 3rd corner" width="60%" label='r' name="lng3" type="number" onChange={onChange} defaultValue={values.lng3} labelVal="Longitude(Cordinates)" step="any" />
            </div>

            <div className="col-6 text-end ">
              <Input placeholder="Enter latitude of 4th corner" width="60%" label='l' name="lat4" type="number" onChange={onChange} defaultValue={values.lat4} labelVal="Latitude(Cordinates)" step="any" />
            </div>

            <div className="col-6">
              <Input placeholder="Enter longitude  of 4th corner" width="60%" label='r' name="lng4" type="number" onChange={onChange} defaultValue={values.lng4} labelVal="Longitude(Cordinates)" step="any" />
            </div>




            {/* <div className='text-center container my-3' style={{ marginTop: "6rem", marginBottom: '2rem' }}> */}
            {/* <button className="btn form_btn me-4 mx-2" onClick={moveToNext} >Next</button> */}
            {/* </div> */}

            <div className='text-center mt-2 container'>

              <div className="col-12 text-center">
                <Button className="btn reset_btn_outline btn-outline-dark mx-2" onClick={moveToBack}>Back</Button>

                <Button

                  loading={loading}
                  onClick={() => setLoading( true )}
                  type='submit' className="btn form_btn" disabled={!values.plotNo||!values.plotPrice||!values.lat1||!values.lng1||!values.lat2||!values.lng2||!values.lat3||!values.lng3||!values.lat4||!values.lng4||!values.block||!values.plotArea}
                  htmlType="submit"

                >
                  {formVal.plotId? 'Update':'Submit'}

                </Button>

                {/* <button type='submit' className="btn form_btn" >{formVal.plotId? 'Update':'Submit'}</button> */}
              </div>


              <div className="col-12 text-end mb-3">
                {/* <button className="btn form_btn me-4 mx-2" onClick={moveToNext} >Next</button> */}
                <button className="btn form_next_btn " disabled={plotFormStatus==='fail'? true:false} onClick={moveToNext}> next <span className='right_arrow'>&#8594;</span></button>

              </div>

            </div>


          </div>


        </div>



      </form>
    </div>

  )

}

export default PlotForm