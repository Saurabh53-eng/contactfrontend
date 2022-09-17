import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const inputEl=useRef("");
  const removeContact = (id) => {
    props.getContactId(id)
  };
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard contact={contact} removeContact={removeContact} key={contact.id} />
    )
  })
  const getSearchTerm=()=>{
    props.searchKeyword(inputEl.current.value)
  }
  return (
    <>
      <div className='main'>
        <h2>
          Contact List
          <Link to='/addContact'>
            <button className='ui button blue right' style={{float:"right"}}>Add Contact</button>
          </Link>
        </h2>
        <div className='ui search'>
          <div className='ui icon input'>
            <input ref={inputEl} type="text" placeholder="Search Contacts" className='prompt' value={props.term} onChange={getSearchTerm}>
            </input>
            <i className='search icon'></i>
          </div>
        </div>
        <div className='ui celled list'>
          {renderContactList.length>0?renderContactList:"No contact available"}
        </div>
      </div>
    </>
  )
}

export default ContactList