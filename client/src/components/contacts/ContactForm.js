import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);
    const { addContact, updateContact, clearCurrent, current } = contactContext;;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                userName: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        userName: '',
        email: '',
        phone: '',
        type: 'personal'
    });


    const { userName, email, phone, type } = contact;

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearCurrent();

    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type='text'
                placeholder='Enter Name'
                name='userName'
                value={userName}
                onChange={onChange}
            />
            <input
                type='email'
                placeholder='Enter Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Enter Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
            />Personal{' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            />Professional{' '}
            <div>
                <input
                    type="submit"
                    value={current ? 'Edit Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current &&
                <div>
                    <input
                        type='button'
                        value='Clear'
                        onClick={() => clearCurrent()}
                        className='btn btn-light btn-block' />
                </div>
            }
        </form>
    )
}

export default ContactForm
