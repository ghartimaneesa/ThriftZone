import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
   

export default function Order() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        address: '',
        contactNumber: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        const errors = {};
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
            errors.email = 'Invalid email address';
        }
        if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
            errors.contactNumber = 'Invalid contact number (10 digits required)';
        }
        if (!data.address || !/^\S+@\S+\.\S+$/.test(data.address)) {
            errors.address = 'Should be character';
        }
        return errors;
    };
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="box">
                <h2 className="text-center">THRIFTZONE</h2>
                <div className='card'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="exampleInputEmail1"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputContactNumber" className="form-label">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                                id="exampleInputContactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                            />
                            {errors.contactNumber && (
                                <div className="invalid-feedback">{errors.contactNumber}</div>
                            )}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={ e => {
                                e.preventDefault();
                                navigate('/')
                            }}>
                                Place Your Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
