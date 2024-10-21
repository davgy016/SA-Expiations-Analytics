import React, { useEffect, useState } from 'react';
import SHA256 from 'crypto-js/sha256';



function Login() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function onSubmit(e) {
        e.preventDefault();

        //extract input values from Form
        const form = e.target;
        const formData = new FormData(form);
        const userName = formData.get("userName");
        const password = formData.get("password");

        //encrypt the password
        const passwordHash = SHA256(password).toString();

        /**Making post request to send credentials for a log in
         * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
         * 
         */
        var request = new Request(`http://localhost:5147/api/Login?userName=${userName}&passwordHash=${passwordHash}`, {
            method: 'Post',
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify({ userName, password: passwordHash }),
        });

        //checks validation of provided credentials
        fetch(request)
            .then(response => response.json())
            .then(data => {
                if (data==true) {
                    setIsLoggedIn(true);
                    alert("Login successful");
                } else {
                    alert("Login failed");
                }
            })
            .catch(error => console.error("Error" + error));

    }

    return (
        <form onSubmit={onSubmit} className="row justify-content-start mb-3">
            <div className="row">
                <div className="col-3">
                    <input type="text" name="userName" className="form-control"
                        placeholder="Enter username" />
                </div>
                <div className="col-3">
                    <input type="password" name="password"
                        className="form-control" placeholder="Enter password" />
                </div>
                <div className="col-auto">
                    <button type="submit" className="form-control btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    )
}

export default Login;
