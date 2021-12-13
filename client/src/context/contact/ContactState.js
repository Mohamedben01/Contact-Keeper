import react, { useReducer } from 'react';
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from 'axios';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT
} from "../types";


const ContactState = props => {

    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);


    //Get All Contacts
    const allContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }
    }

    //Update Contact
    const updateContact = async (contact) => {
        // console.log('Contact update: ', contact._id);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put('/api/contacts/' + contact._id, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: contact
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

    }
    //Delete Contact
    const deleteContact = async (_id) => {
        try {
            const res = await axios.delete('/api/contacts/' + _id);
            dispatch({
                type: DELETE_CONTACT,
                payload: _id
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.msg
            })
        }

    }

    //Set Current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    //Clear Current Contact
    const clearCurrent = (contact) => {
        dispatch({ type: CLEAR_CURRENT })
    }

    //Filter Contact
    const filteredContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    //Clear Contact
    const clearFiltered = () => {
        dispatch({ type: CLEAR_FILTER })
    }



    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                allContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filteredContacts,
                clearFiltered,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}
export default ContactState;
