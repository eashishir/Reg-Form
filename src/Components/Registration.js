import React, { useState } from 'react';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import app from '../Firebase/firebase.init';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



const Registration = () => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});

    const handleRegister = event => {

        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.password.value;
        console.log(user);

        const userInfo = { name, email, password }

        // send user data post method mongodb database


        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo),


        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {


                    toast.success("User Added Successfully", {
                        position: "top-center",
                        theme: "colored",
                    });


                    form.reset();

                }
                if (data.error) {
                    setError(data.error)
                }

            })

        // firebase Auth
        //     createUserWithEmailAndPassword(auth,  email, password)
        //     .then( result => { 
        //         const user = result.user;
        //         console.log(user)
        //         toast.success("User Create Successfully",{
        //             position: "top-center",
        //             theme: "colored",
        //         });
        //         form.reset();

        //     })
        //     .catch(error => {
        //         console.error("error", error);
        //         setPasswordError (error.message) ;
        //     })


    }


    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser);

    }



    return (
        <div className=''>
            <div className="wrapper">
                {/* navigation */}
                <nav className="nav">
                    <div className="nav-logo">
                        <p>EAshishir .</p>
                    </div>
                    <div className="nav-menu" id="navMenu">
                        <ul>
                            <li><a href="#" className="link active">Home</a></li>

                        </ul>
                    </div>
                    <div className="nav-button">

                        <button className="btn white-btn" >Registration</button>
                    </div>
                    <div className="nav-menu-btn">
                        <i className="bx bx-menu" onclick="myMenuFunction()"></i>
                    </div>
                </nav>

                {/* Registration form */}
                <div className='flex'>
                    <Form className='mx-auto ' onSubmit={handleRegister} >
                        <h2 className='text-white mb-5 '>Registration Form</h2>



                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-white'>Name</Form.Label>
                            <Form.Control onBlur={handleInputBlur} name='name' className='rounded-pill' type="text" placeholder="Enter name" required />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-white'>Email address</Form.Label>
                            <Form.Control onBlur={handleInputBlur} name='email' className='rounded-pill'  type="email" placeholder="Enter email" required  />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-white'>Password</Form.Label>
                            <Form.Control onBlur={handleInputBlur} name='password' className='rounded-pill' type="password" placeholder="Password" required />
                        </Form.Group>

                        {error &&  <p className='text-danger bg-white rounded-pill   '>{error.slice(0,44)}</p>}
                        <Button className='rounded-pill ' variant="info" size='md' type="submit">
                            Register
                        </Button>
                        <ToastContainer ></ToastContainer>
                    </Form>
                   
                   
                </div>
                
               
               
               
            </div>






           

        </div>
    );
};

export default Registration;