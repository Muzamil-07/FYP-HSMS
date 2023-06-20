import React from 'react';
import TextField from '@mui/material/TextField';


const Input=( { type, name, placeholder, width, onChange, disabled=false, margin, defaultValue, label, labelVal, step, required=true, unit, mask, error, helperText, InputProps, value, df } ) => {

    // console.log( "DF:", defaultValue )
    return (
        <>
            {/* <input type={type} id={name} name={name} className={`input ${margin}`} step={step} placeholder={placeholder} style={{ width: width }} onChange={onChange} required={required} disabled={disabled} defaultValue={defaultValue===''? '':defaultValue}
                data-content="Popover with data-trigger" rel="popover" data-placement="bottom" data-original-title="Title" data-trigger="hover"  />
            <p className={`input_label_${label}`} style={{ width: width }}>{labelVal}</p>
             */}


            <TextField type={type} id={name} error={error} helperText={helperText} onChange={onChange} required={required} disabled={disabled} defaultValue={defaultValue} name={name} className={`input ${margin}`} step={step} label={labelVal} style={{ width: width }} variant="standard" InputProps={InputProps} />



        </>


    );
};

export default Input;