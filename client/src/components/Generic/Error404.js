import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/Error.css'
const Error404=() => {
  return (
    <div className="container">
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Page not found!</h1>
            <h2>404 - The page you requested does not exist or currently not available!</h2>
          </div>
          <Link className='a' to='/'>Go TO Home</Link>
        </div>
      </div>
    </div>

  )
}

export default Error404