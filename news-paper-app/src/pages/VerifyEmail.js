// VerifyEmail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios.get(`http://localhost:5000/api/verify-email?token=${token}`)
        .then(response => setMessage(response.data.message))
        .catch(error => setMessage(error.response?.data?.message || 'Verification failed'));
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Verify Email</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;