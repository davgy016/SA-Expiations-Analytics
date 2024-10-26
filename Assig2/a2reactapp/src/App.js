import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

/** After login set greeting with userName. To achieve this use useOutletContext(in Login page) to access data and outlet context to pass data to child
 * Ref: https://medium.com/@bobjunior542/react-router-6-advanced-routing-with-useoutlet-and-useoutletcontext-2cfca328b7ac
 *      https://medium.com/@jasen.miyamoto/learning-react-usecontext-and-useoutletcontext-abab8fa266bb
 * 
 */

function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    //current Nav button retains active after page refreshing
    const isActive = (path) => location.pathname === path ? 'active' : '';

    function signOut() {
        setUser(null);
        navigate("./Login");
    }

    function signIn() {
        navigate("./Login")
    }

    return (
        <div className="App">
            <nav className="navbar  p-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="Home">Expiations SA</Link>
                    <div className="navbar-collapse row collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${isActive("/Home")}`} to="/Home">Home</Link>
                            <Link className={`nav-link ${isActive("/About")}`} to="/About">About</Link>
                            <Link className={`nav-link ${isActive("/Privacy")}`} to="/Privacy">Privacy</Link>
                            <Link className={`nav-link ${isActive("/Dashboard")}`} to="/Dashboard">Dashboard</Link>
                        </div>
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                    {user ? (
                        <>
                            <div className="navbar-text">Hello, {user} </div>
                            <div className="row">
                                <CgProfile className="icon" />
                                <button id="loginBtn" className="btn btn-active" onClick={signOut}>Sign Out</button>
                            </div >
                        </>
                    ) : (
                        <>
                            <div className="row">
                                <CgProfile className="icon" />
                                <button id="loginBtn" className="btn btn-active" onClick={signIn}>Sign in</button>
                            </div>
                        </>
                    )}
                    </div>
                </div>
            </nav>
            {/*Share name of username globally with children*/}
            <Outlet context={{ user, setUser }} />
        </div>

    );
}

export default App;


