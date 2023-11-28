import React from "react";
import { useCart } from "../components/Contextreducer";
import { useNavigate } from 'react-router-dom';
import "../styles/cart.css";

const Checkout = () => {
    const cartItems = useCart();
    cartItems.map((item, index) => console.log("item" + index, item))
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <p className="text-center empty-cart-message fs-1">Cart is empty</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="text-center">Your Shopping Cart</h1>
                    
                    {console.log(cartItems)}

                    <table className='table table-hover '>
                        <thead className=' text-primary fs-4'>
                            <tr>
                                <th scope='col' >S.N</th>
                                <th scope='col' >Name</th>
                                <th scope='col' >Quantity</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total text-center mt-4">
                        <span className="fs-5">Total Price of Your Cart:</span>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary btn-lg" onClick={
                            e => {
                                e.preventDefault();
                                navigate('/')
                            }
                        }>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
