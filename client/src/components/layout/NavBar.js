import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const NavBar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const { logout, isAuthenticated, user } = authContext;

    const authLinks = (
        <Fragment>
            <li>
                Hello {user && user.user.userName}
            </li>
            <li>
                <Link onClick={logout} to='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
};

NavBar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

export default NavBar;
