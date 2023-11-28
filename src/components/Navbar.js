// import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const localUser = localStorage.getItem('authToken');

  // State to track the cart count
 

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            THRIFTZONE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active fs-4" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localUser && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/"
                  >
                    My Orders
                  </Link>
                </li>
              )}
              {localUser && (
                <li className="nav-item">
                  <button
                    className="btn bg-white text-primary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/checkout');
                      // Call addToCart to update the cart count
                    }}
                  >
                    My cart
                    
                  </button>
                </li>
              )}
              {localUser && (
                <li className="nav-item">
                  <button
                    className="btn bg-white text-primary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem('authToken');
                      navigate('/login');
                    }}
                  >
                    LogOut
                  </button>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {!localUser && (
                <>
                  <button
                    className="btn bg-white text-primary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/login');
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="btn bg-white text-primary mx-1"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/creatuser');
                    }}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
