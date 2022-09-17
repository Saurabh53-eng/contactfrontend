import React from 'react'
import { Link } from 'react-router-dom';
import user from '../images/user.png'

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  function deleteProfile() {
    props.removeContact(id)
  }
  return (
    <div>
      <div className='item'>
        <img className='ui avatar image' src={user} alt="user" />
        <div className='content'>
          <Link to={{ pathname: `edit`, state: { contact: props.contact } }} style={{ cursor: "pointer" }}>
            <i className='edit alternate outline icon' style={{ color: "red", marginTop: "7px" }} />
          </Link>

          <Link to={{ pathname: `contact/${id}`, state: { contact: props.contact } }}  >
            <div className='header'>{name}</div>
            <div>{email}</div>
          </Link>

          <i className='trash alternate outline icon' style={{ color: "red", marginTop: "7px" }} onClick={() => { deleteProfile() }}>
          </i>

        </div>
      </div>
    </div>
  )
}

export default ContactCard