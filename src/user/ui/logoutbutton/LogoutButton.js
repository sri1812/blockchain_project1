import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <li>
      <a href="#" onClick={(event) => onLogoutUserClick(event)}>Home</a>
    </li>
  )
}

export default LogoutButton
