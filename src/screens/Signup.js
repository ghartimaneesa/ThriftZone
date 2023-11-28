import React, { useState } from 'react'
import { Link } from 'react-router-dom';

// import React,{ Component } from 'react';




export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();  //synthetic event
        console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });

        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter valid Credentials")
        }

    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
        console.log(onChange)
    }
    return (
        
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control"   id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange}/>
                                
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                                
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Address</label>
                            <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                                
                        </div>
                       
                        <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className='m-3 btn btn-primary'>Already a user</Link>
                </form>
            
            </div>
          

        
    )
}
