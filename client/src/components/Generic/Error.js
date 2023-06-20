import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Error.css'
const Error=() => {
  return (
    <div className="container">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Restricted!</h1>
            <h2>403 - You are not authorize to perform this action!</h2>
          </div>
          <Link className='a' to='/'>Go TO Home</Link>
        </div>
      </div>
    </div>

  )
}

export default Error