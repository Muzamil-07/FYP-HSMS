import React, { useContext } from "react";
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import './../../css/sideNavbar.css'
import { useLocation } from 'react-router-dom'
import UsersContext from '../../context/users/UsersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import BottomBar from "../BottomBar";





export default function Sidenavbar() {
  const location=useLocation();
  const { user, Cookies, setUser }=useContext( UsersContext )
  let navigate=useNavigate();

  const handleLogout=( e ) => {
    e.preventDefault();

    Cookies.remove( 'jwt' );
    window.localStorage.removeItem( 'UR' );
    setUser( {} )
    navigate( '/login' );

  }


  return (

    <>


      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="p-3">
            <Link to={`/dashboard/${user.role==='admin'? '':'profile'}`} className={`img_img logo ${user.role}_logo  rounded-circle mb-5`} />

            <ul className="list-unstyled components mb-5">



              {user.role==='admin'&&<li className={`${location.pathname.endsWith( "users" )||location.pathname.endsWith( '/' )||location.pathname.endsWith( 'd' )? "active":''}`}>
                <Link to='/dashboard/users'><span className="me-3"><FontAwesomeIcon icon={faUsers} /></span><span className="users_text">Users</span></Link>
              </li>
              }

              {user.role==='admin'&&<li className={`${location.pathname.endsWith( "createnewuser" )? "active":''}`}>
                <Link to='/dashboard/createnewuser'><span className="me-3"><FontAwesomeIcon icon={faUserPlus} /></span><span className="create_new_user_text">Create New User</span></Link>
              </li>}


              {user.role==='admin'&&<li className={`${location.pathname.endsWith( "approvalrequests" )? "active":''}`}>
                <Link to='/dashboard/approvalrequests'><span className="me-3"><FontAwesomeIcon icon={faFileCircleCheck} /></span><span className="approval_req_text">Approval Requests</span></Link>
              </li>}

              {user.role==='admin'&&<li className={`${location.pathname.endsWith( "notification" )? "active":''}`}>
                <Link to='/dashboard/notification'><span className="me-3"><FontAwesomeIcon icon={faBell} /></span><span className="notification_text">Notifications</span></Link>
              </li>}

              {user.role==='admin'&&<li className={`${location.pathname.endsWith( "feedbacks" )? "active":''}`}>
                <Link to='/dashboard/feedbacks'><span className="me-3"><FontAwesomeIcon icon={faComment} /></span><span className="feedbacks_text">Feedbacks</span></Link>
              </li>}




              {( user.role==='user' )
                &&
                <li className={`${location.pathname.endsWith( "profile" )||location.pathname.endsWith( '/' )||location.pathname.endsWith( 'd' )? "active":''}`}>
                  <Link to='/dashboard/profile'><span className="me-3 profile_icon"><FontAwesomeIcon icon={faAddressCard} /></span><span className="profile_text">Profile</span></Link>
                </li>}


              {user.role==='user'&&<li className={`${location.pathname.endsWith( "plot" )? "active":''}`}>
                <Link to='/dashboard/plot'><span className="me-3 plot_icon"><FontAwesomeIcon icon={faMountain} /></span><span className="plot_text">My plot</span></Link>
              </li>}


              {user.role==='user'&&<li className={`${location.pathname.endsWith( "installments" )? "active":''}`}>
                <Link to='/dashboard/installments'><span className="me-3 installment_icon"><FontAwesomeIcon icon={faMoneyBillTransfer} /></span><span className="installment_text">Installments</span></Link>
              </li>
              }

              {user.role==='user'&&<li className={`${location.pathname.endsWith( "feedbackform" )? "active":''}`}>
                <Link to='/dashboard/feedbackform'><span className="me-3 feedback_form_icon"><FontAwesomeIcon icon={faComment} /></span><span className="feedback_form_text">Feedback Form</span></Link>
              </li>}



              {user.role==='user'&&<li className={`${location.pathname.endsWith( "forms" )? "active":''}`}>
                <Link to='/dashboard/forms'><span className="me-3 forms_icon"><FontAwesomeIcon icon={faMountain} /></span><span className="forms_text">Forms</span></Link>
              </li>}








            </ul>
          </div>
        </nav>


        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-light dashboard_nav" >
            <div className="container-fluid">
              <Link to='/'><span className="text-black alkareem_city_text">Housing Society Management System</span></Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav nav_group ms-auto">

                  <li className="nav-item">
                    <Link className="nav-link nav_logout" to="/login" onClick={handleLogout}><span className="me-2 logout_icon"><FontAwesomeIcon icon={faRightFromBracket} /></span><span className="logout_text">Logout</span></Link>
                  </li>


                </ul>
              </div>
            </div>
          </nav>
          <div className={`content_container  ${!user.id? 'text-center':''}`}>
            {/* <div className={`content_container  text-center`}> */}









            {!user._id? <div> <div className="spinner-grow" style={{ width: "5rem", height: '5rem', marginTop: "11rem" }} role="status">

            </div><div className="" style={{ fontSize: "12px" }}>Loading...</div></div>:<Outlet />}




          </div>
        </div>
      </div>
      <div className="bottom_nav">
        {

          user.role==='user'&&<BottomBar />


        }

      </div>

    </>

  )
}
