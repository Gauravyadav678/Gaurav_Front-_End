import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from '../components';

import axios from "axios"

const Login = () => {

  const history=useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    userType: 'buyer', // Default value, you can change it based on your requirements
  });
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    console.log(form);

    try{
      const {email,password}=form;
      await axios.post("http://localhost:3001/",{
          email,password
      })
      .then(res=>{
          if(res.data==="exist" && form.userType=="seller"){
            alert(`hello Your Welcome ${email}`)
            history('/seller', { state: { id: email, userType: form.userType } });
            localStorage.setItem("loggedInEmail", email);
          }
          else if(res.data==='exist' && form.userType==="buyer")
          {
            alert(`hello Your Welcome ${email}`)
            history('/hm', { state: { id: email, userType: form.userType } });
            localStorage.setItem("loggedInEmail", email); 
          }
          else if(res.data==="notexist"){
              alert("User have not sign up")
          }
      })
      .catch(e=>{
          alert("wrong details")
          console.log(e);
      })

  }
  catch(e){
      console.log(e);

  }



  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </div>

              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="userType">Select Type</label>
                <select
                  name="userType"
                  id="userType"
                  className="form-control"
                  value={form.userType}
                  onChange={handleChange}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="my-3">
                <p>
                  New Here?{' '}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>{' '}
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
