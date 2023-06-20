import '../../css/FormHeading.css';
import React from 'react';

export const FormHeading = (props) => {
  return(
    <>
   <div className="headingBox" style={{marginTop:props.marginTop}}>
        <h1 className="formHeading fw-bold">
  {props.value}
  </h1>
      </div>

      {props.subHeading? <p className='text-center sub_head'>{props.subHeading}</p>
        :''} 

  </>
  );
}
