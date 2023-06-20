import '../../css/welcome.css';

import React from 'react';
import Welcome1 from './Welcom';
import Navbar from '../Header/Navbar';
// import Navbar from '../Navbar';

const Welcome = () => {
    return (

        <><Navbar /><div>

            <div className='welcome_background'>
                <div className="welcome_clipPath" style={{ paddingTop: '120px' }}>
                    {/* <SignupForm /> */}
                    {/* <SignInForm/> */}
                    <Welcome1 />

                </div>
            </div>

        </div></>
    );
};

export default Welcome;