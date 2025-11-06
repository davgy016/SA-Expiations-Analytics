import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Privacy from './routes/Privacy';
import About from './routes/About';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Report from './routes/Report';
import Login from './components/Login';
import AuthRoute from './routes/AuthRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<App />}>
                {/*wrap all the routes by AuthRoute to restrict accessing data without authorisation */}
                    <Route path="Home" element={<AuthRoute><Home /> </AuthRoute>} />
                    <Route path="Privacy" element={<AuthRoute><Privacy /></AuthRoute>} />
                    <Route path="About" element={<AuthRoute><About /></AuthRoute>} />
                    <Route path="Dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
                    <Route path="Report" element={<AuthRoute><Report /></AuthRoute>} />
                    <Route path="" element={<Login />} /> {/**route when URL is localhost: [port] */}
                    <Route path="*" element={<Login />} />{/**route matches anything */}
                    <Route path="Login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
