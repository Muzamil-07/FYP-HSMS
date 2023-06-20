import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/App.css';
import UsersContext from '../../context/users/UsersContext';
import { useContext } from 'react';

const Navbar = () => {
  const {user}=useContext(UsersContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light NAVBAR  ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Al Kareem City</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>

            <li className="d-flex nav-item">

              <Link to={`${user.role==='user'? '/dashboard/profile':'/dashboard'}`} className='btn btn-secondary'>DASHBOARD</Link>
            </li>


          </ul>
    </div>
  </div>
</nav>

    );
};

export default Navbar;