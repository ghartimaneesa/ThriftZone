  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';

  export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert('Enter valid Credentials');
      }
      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        console.log(localStorage.getItem('authToken'));
        navigate('/');
      }
    };

    const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value });
      console.log(onChange);
    };

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card">
              <div className="card-body p-5" style={{ fontFamily: 'Circular, Arial, sans-serif' }}>
                <h2 className="text-center mb-4">Thrift Zone</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={credentials.email}
                      onChange={onChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <Link to="/creatuser" className="btn btn-link">
                      Create an account
                    </Link>
                  </div>
                </form>
              </div>
            </div>A
          </div>
        </div>
      </div>
    );
  }
