import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../styles/Payment.css';

const stripePromise = loadStripe('pk_test_51PEuDgSIqyVgoIp05WEc6gWU8Vi1yVbEPV7bdDG5K7Gi1XvuEElrKlTyoJIH78YUO1IUTEisywlVS9FrAhJHXmOx00OEaxhpTs');

const CheckoutForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    
    if (error) {
      setPaymentError(error.message);
    } else {
      // Handle successful payment
      const response = await axios.post('yhttp://localhost:8080/payment', {
        payment_method_id: paymentMethod.id,
      });
      
      if (response.data.success) {
        // Payment success
        console.log('Payment successful');
      } else {
        // Payment failed
        console.error('Payment failed:', response.data.error);
        setPaymentError(response.data.error.message);
      }
    }
  };
  
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <CardElement className="card-element" />
      <button className="submit-button" type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div>{paymentError}</div>}
    </form>
  );
};

const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;