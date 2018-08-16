import React from 'react'

// Images
// import uPortLogo from '../../../img/uport-logo.svg'

// <img className="uport-logo" src={uPortLogo} alt="UPort Logo" /> 

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <li><a href="#" onClick={(event) => onLoginUserClick(event)}><i className="ti-settings"></i><p>&nbsp; Login with UPort</p></a></li>
  )
}

export default LoginButton
