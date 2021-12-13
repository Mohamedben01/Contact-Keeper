import React, { useRef, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const { filteredContacts, clearFiltered, filtered } = contactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    })

    const text = useRef('');

    const onChange = (e) => {
        if (text.current.value !== '') {
            filteredContacts(e.target.value);
        } else {
            clearFiltered();
        }
    }
    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contact...'
                onChange={onChange}
            />
        </form>
    )
}

export default ContactFilter
