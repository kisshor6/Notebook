import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/create", {

      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Input valid email and password", "danger")
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-5 container'>
      <h1>Create account to use  i-Notes</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" onChange={onChange} id="name" name='name' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name='email' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="cpassword" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
