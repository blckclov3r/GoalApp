import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout,reset} from '../features/auth/authSlice';
import {reset as goalReset} from '../features/goals/goalSlice'
import {reset as authReset} from '../features/auth/authSlice'

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);

    const onLogout = () =>{
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        dispatch(goalReset())
        dispatch(authReset())
    }

    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand"><h1>Goal Setter</h1></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            { 
                                user ? 
                                 <>
                              <li className="nav-item">
                                <button className="btn btn-primary" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                            </li>
                                </> 
                                
                                : 
                                <>
                                <li className="nav-item">
                                <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/register" className="nav-link"><FaSignOutAlt /> Register</Link>
                            </li>
                                </>
                            }
                            
                       
                        </ul>
                    </div>
                </div>
            </nav>

    )
}
