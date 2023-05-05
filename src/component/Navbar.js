import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();

    const handleLogOut=()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }

    let location = useLocation();
    useEffect(() => {
    }, [location]);
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNote-book</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "about" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')? <form className="d-flex">
                            <Link to="/login" className="btn btn-outline-primary mx-1" type="submit">login</Link>
                            <Link to="/signup" className="btn btn-outline-primary mx-1" type="submit">signup</Link>
                        </form>: <button onClick={handleLogOut}  className='btn btn-outline-primary'>Logout</button> }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
