import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("You login successfully", "success")
            navigate("/");

        } else {
            props.showAlert("Invalid email and password", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-5 container'>
            <h1>Please Login to access Your i-Notes</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} name='password' id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
