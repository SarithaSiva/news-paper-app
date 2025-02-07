// Payment.js
import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id to your backend to confirm the payment
      const response = await axios.post('/api/payment', { paymentMethodId: paymentMethod.id });
      if (response.data.success) {
        alert('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);
export default Payment;