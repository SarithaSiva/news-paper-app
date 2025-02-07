import React, { useState } from 'react';
import bcrypt from 'bcryptjs'; // Removed duplicate require statement
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            console.log('Hashed Password:', hashedPassword);

            // TODO: Send formData (including hashed password) to the backend

            navigate('/login'); // Redirect after registration
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
