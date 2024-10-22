import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

/** After login set greeting with userName. To achieve this use useOutletContext(in Login page) and outlet context
 * Ref: https://medium.com/@bobjunior542/react-router-6-advanced-routing-with-useoutlet-and-useoutletcontext-2cfca328b7ac
 * https://medium.com/@jasen.miyamoto/learning-react-usecontext-and-useoutletcontext-abab8fa266bb
 * 
 */

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    function logOut() {
        setUser(null);
        navigate("./Login");
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg p-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Expiations SA</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" to="/Home">Home</Link>
                            <Link className="nav-link active" to="/About">About</Link>
                            <Link className="nav-link active" to="/Privacy">Privacy</Link>
                        </div>                   
                    </div>
                    {user ? (
                        <>
                            <div className="navbar-text">Hello, {user} </div>
                            <div className="row">
                                <CgProfile className="icon" />
                                <button className="btn btn-active" onClick={logOut}>Log Out</button>
                            </div >


                        </>
                    ) : (
                        <>
                            <div className="me-5">
                                <CgProfile className="icon" />
                                <Link className="nav-link active" to="/Login">Login</Link>
                            </div>
                        </>
                    )}
                </div>
            </nav>
            <Outlet context={{ setUser }} />
        </div>

    );
}

export default App;


