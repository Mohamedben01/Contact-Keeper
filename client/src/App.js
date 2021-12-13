
import react, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './components/pages/Home';
import ContactState from "./context/contact/ContactState";
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';


const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<PrivateRoute />}
                  >
                    <Route
                      exact
                      path="/"
                      element={<Home />}
                    />
                  </Route>
                  <Route
                    exact
                    path="/register"
                    element={<Register />}
                  />
                  <Route
                    exact
                    path="/login"
                    element={<Login />}
                  />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>

  );
}

export default App;
