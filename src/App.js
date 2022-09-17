import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactDetails from './components/ContactDetails';
import '../src/App.css'
import api from '../src/api/contacts'
import EditContact from './components/EditContact';
function App() {
  const [contacts, setcontacts] = useState([])
  const [searchTerm, setsearchTerm] = useState("")
  const [searchResults, setsearchResults] = useState([])
  const retrieveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data;
  }
  const contactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts", request);
    setcontacts([...contacts, response.data])
  };

  const updateContact = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setcontacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    })
    );
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  }
  const searchHandler = (searchTerm) => {
    setsearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase())
      })
      setsearchResults(newContactList);
    }
    else{
      setsearchResults(contacts)
    }
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const Contacts = await retrieveContacts();
      if (Contacts) setcontacts(Contacts);
    };
    getAllContacts();
  }, [])


  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact={true} render={(props) => <ContactList {...props} contacts={searchTerm.length<1?contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path='/addContact' exact={true} render={(props) => <AddContact {...props} contactHandler={contactHandler} />} />
          <Route path='/contact/:id' exact={true} render={(props) => <ContactDetails {...props} contactHandler={contactHandler} />} />
          <Route path='/edit' exact={true} render={(props) => <EditContact {...props} updateContact={updateContact} />} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;

