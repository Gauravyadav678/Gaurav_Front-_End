import React, { useState } from 'react';
import { Footer, Navbar } from '../components';
import {useNavigate, Link } from 'react-router-dom';
import axios from "axios";
const Register = () => {
    const history=useNavigate();
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        const{email,firstName,lastName,password,userType}=form;
        
        console.log("inside handle submit", form);
        try{

            await axios.post("http://localhost:3001/signup",{
            email,
            firstName,
            lastName,
            password,
            userType
            })
            .then(res=>{
                if(res.data=="exist"){
                    alert("User already exists")
                }
                else if(res.data=="notexist"){
                alert(`Successfully Created ${userType} Account Now login`)
                history('/login');
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
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="Fname">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="lname">Last  Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
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
                                    value={form.UserType}
                                    onChange={handleChange}
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-decoration-underline text-info">
                                        Login
                                    </Link>{' '}
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
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

export default Register;
