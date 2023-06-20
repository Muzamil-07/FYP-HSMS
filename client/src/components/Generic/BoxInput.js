import React from 'react'


const BoxInput=( props ) => {
  const { heading, value, icon }=props;
  return (
    <div className="input-group mb-5" style={{ fontSize: "12px" }}>
      <span className="input-group-text text_marker" id="basic-addon1" style={{ background: '#caa10aa2', color: "white", fontSize: "13px", width: "155px" }}><span className='me-3'>{icon}</span> {heading}</span>
      <input type="text" disabled className="form-control " value={value} aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: "13px" }} />
    </div> )
}

export default BoxInput