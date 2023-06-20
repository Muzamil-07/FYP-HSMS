import React, { Component } from 'react';
import '../css/FileInputField.css'

export const FileInputField = (props) => {
  return(
    <div className="file_form mx-auto" style={{width:props.width}}>
  <input className="form-control" type="file" id="formFile"/>
</div>
  )
};
