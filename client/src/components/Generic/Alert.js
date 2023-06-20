import React, { useContext } from 'react'
import AppContext from '../../context/appState/AppContext'
import { message } from 'antd';

export default function Alert() {

  const { alert, setAlert }=useContext( AppContext );

  if ( alert ) {

    return (
      <div className={`alert alert_box alert-${alert.type} alert-dismissible w-md-25 w-50 mx-auto fade show`} role="alert">
        <strong>{alert.type==='danger'? "error":alert.type}: </strong> {alert.msg}
      </div>
    )

  }
  else {
    return <></>
  }


}
