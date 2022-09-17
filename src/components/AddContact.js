import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const AddContact = (props) => {
    const history = useHistory();
    const [state, setState] = useState({ name: "", email: "" })
    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const submit = (e) => {
        e.preventDefault();
        console.log('form submitted ✅');
        if (state.name === "" || state.email === "") {
            alert("name and email cannot be empty");
            history.push('/addContact')
        } else {
            props.contactHandler(state)
            setState({ name: "", email: "" })
            history.push('/')
        }
    };

    return (
        <div className='ui main' >
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={submit}>
                <div className='field' >
                    <Link to='/'><button className='ui button blue right' style={{ float: "right" }}>Contact List</button></Link>
                </div>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name='name' value={state.name} onChange={onChange} placeholder="Name" />
                    <label>Email</label>
                    <input type="email" name='email' value={state.email} onChange={onChange} placeholder="Email" />
                </div>
                <div>
                    <button disabled={state.name.length < 2 || state.email.length < 5} type="submit" className="ui button black right" >Add Contact</button>
                </div>
            </form>
        </div>
    )
}

export default AddContact