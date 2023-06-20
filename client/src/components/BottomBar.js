import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import './../css/sideNavbar.css';






export default function BottomBar() {
    const [value, setValue] = React.useState(0);

  return (
    <>

      <Box>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '3.5rem' }} elevation={3}>

      <BottomNavigation
            sx={{ color: 'yellow', fontSize: '46px' }}

        showLabels
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        >

            <BottomNavigationAction label="Profile" component={Link} to='/dashboard/profile' icon={<span style={{ fontSize: '23px' }}><FontAwesomeIcon icon={faAddressCard} /></span>} />
            <BottomNavigationAction label="My plot" component={Link} to='/dashboard/plot' icon={<span style={{ fontSize: '23px' }}><FontAwesomeIcon icon={faMountain} /> </span>} />
            <BottomNavigationAction label="Installments" component={Link} to='/dashboard/installments' icon={<span style={{ fontSize: '23px' }}><FontAwesomeIcon icon={faMoneyBillTransfer} /></span>} />
            <BottomNavigationAction label="Feedback" component={Link} to="/dashboard/feedbackform" icon={<span style={{ fontSize: '23px' }}><FontAwesomeIcon icon={faComment} /></span>} />
            <BottomNavigationAction label="Forms" component={Link} to='/dashboard/forms' icon={<span style={{ fontSize: '23px' }}><FontAwesomeIcon icon={faMountain} /> </span>} />
      </BottomNavigation>
          </Paper>
      </Box>




      {/* 
      <div className="bottom_navbar">
        
        <div className="row">

          <div className="col-4">hisdhisd</div>
        </div>


      </div> */}

    </>
  )
}
