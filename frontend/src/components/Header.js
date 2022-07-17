import React from 'react'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link to="/" className="navbar-brand">Goal Setter</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link active"><FaSignInAlt /> Login</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="/register" className="nav-link active"><FaSignOutAlt /> Register</Link>
                            </li>
                       
                        </ul>
                    </div>
                </div>
            </nav>

    )
}
