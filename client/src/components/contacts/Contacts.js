import React, { useContext, Fragment, useEffect } from 'react'
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, allContacts, loading } = contactContext;

    useEffect(() => {
        allContacts();
        //eslint-disable-next-line
    }, []);
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout={400} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))
                    : contacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={400} classNames='item' >
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;