import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const { register, errors, clearErrors, isAuthenticated } = authContext;
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (errors === "User already exists") {
            setAlert(errors, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [errors, isAuthenticated, navigate])

    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        password2: ''
    })

    const { userName, email, password, password2 } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (userName === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords not match', 'danger');
        } else {
            register({
                userName,
                email,
                password,
            });
        }
    }


    return (
        <div className='form-container'>
            <h1>Account <span className='text-primary'>Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='userName'>UserName</label>
                    <input type='text' placeholder='Enter UserName' name='userName' value={userName} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='text' name='email' placeholder='Enter Email Address' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='Enter Password' value={password} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' placeholder='Repeat Password' value={password2} onChange={onChange} />
                </div>
                <input type='submit' value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register
