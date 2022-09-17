import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const EditContact = (props) => {
    const history = useHistory();
    const { id, name, email } = props.location.state.contact;
    const [state, setstate] = useState({ id, name, email })
    const update = (e) => {
        e.preventDefault();
        console.log('form updated ✅');
        if (state.name === "" || state.email === "") {
            alert("name and email cannot be empty");
            history.push('/edit')
        } else {
            props.updateContact(state)
            setstate({ name: "", email: "" })
            history.push('/')
        }
    };

    const onChange = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    };

    return (
        <div className='ui main' >
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <h2>Add Contact</h2>
                    <Link to='/'><button className='ui button blue right'>Contact List</button></Link>
                </div>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name='name' value={state.name} onChange={onChange} placeholder="Name" />
                    <label>Email</label>
                    <input type="email" name='email' value={state.email} onChange={onChange} placeholder="Email" />
                </div>
                <div>
                    <button disabled={state.name.length < 2 || state.email.length < 5} type="update" className="ui button black right" >update Contact</button>
                </div>
            </form>
        </div>
    )
}

export default EditContact