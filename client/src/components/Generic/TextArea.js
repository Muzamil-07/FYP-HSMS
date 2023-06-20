import React from 'react'

const TextArea=( props ) => {
  return (
    <textarea id="" className={`textArea ${props.center}`}  placeholder={props.placeholder} name={props.name} rows={props.rows} onChange={props.onChange} style={{ width: props.width }}>

    </textarea>

  )
}

export default TextArea