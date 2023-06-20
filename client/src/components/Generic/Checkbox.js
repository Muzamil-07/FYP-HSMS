import React from 'react';

const Checkbox = (props) => {
    return (
        <>
         <div className="form-check mt-4  checkboxx">
    <input className="form-check-input checkboxx_input" type="checkbox" value="" id="flexCheckDefault" />
        <p>{props.name}</p>
</div>


        </>
    );
};

export default Checkbox;