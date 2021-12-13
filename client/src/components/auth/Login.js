import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { login, errors, clearErrors, isAuthenticated } = authContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (errors === 'Invalid Credentials!') {
            setAlert(errors, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [errors, isAuthenticated, navigate])

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else {
            login({ email, password });
        }

    }
    return (
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='text' name='email' placeholder='Enter Email Address' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='Enter Password' value={password} onChange={onChange} />
                </div>
                <input type='submit' value='Login' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Login
