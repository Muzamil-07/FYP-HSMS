import React, { Component } from 'react';
import { FormHeading } from "../FormHeading";
import Input from '../Input';
import { FormDropdown } from '../FormDropdown';
import { FileInputField } from '../FileInputField';
import TextArea from '../TextArea';

export const Digitalpages = (params) => {
  return(
    
   <div className="container">
     <div className="col-12">
       <FormHeading value='Digital Pages'/>
       </div>
     <div className="row mt-5">
     <div className="col-6  text-center">
       <Input name='name' width='60%' placeholder='Name' type='text'/>
       </div>
     <div className="col-6 text-center">
       <Input name='phone' width='60%' placeholder='Contact' type='tel'/>
       </div>
       </div>
      <div className="row mt-5">
      <div className="col-6 text-center">
          <FormDropdown name='Category' width='60%' backgroundColor='#bd960a' color='white' list={['Banks','Schools','Banks','Schools']}/>
       </div>
     <div className="col-6 ">
       <FileInputField width='60%'/>
       </div>
        </div>

        <div className="row mt-5">
          <TextArea name='description' placeholder='Description' rows='7' width='80%' center='mx-auto'/>
          </div>
     </div>


  )  
}
