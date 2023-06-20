import React, { useRef } from "react";
// import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Success from "./Success";

export default function PrintComponent( props ) {
  let componentRef=useRef();
  const { formVal: values, userFormStatus: user, plotFormStatus: plot, installmentFormStatus: installment, previousStep, setFormVal }=props;

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button className="btn reset_btn_outline btn-outline-dark mx-2" >Print this</button>
          }
          content={() => componentRef}
        />

        {/* component to be printed */}
        <Success ref={( el ) => ( componentRef=el )} values={values} setFormVal={setFormVal} user={user} plot={plot} installment={installment} previousStep={previousStep} />
      </div>
    </>
  );
}