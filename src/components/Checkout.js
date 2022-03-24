import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Donet from "../images/donet.png";
import "../styles/styles.css";

import { Button } from 'react-bootstrap';

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: 'price_1KgiqvFH4lfT731M7iIDgZuD',
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
    customerEmail: "hello@donet.com",
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>Butter Choclate glazed donets</h1>
      <h1 className="checkout-price">$1</h1>
      <img
        className="checkout-product-image"
        src={Donet}
        alt="Product"
      />
      <Button  
      variant="success"
      className="checkout-button"
      onClick={redirectToCheckout}
      disabled={isLoading}
      >
      <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : " $1   Buy"}</p>
      </div>
      </Button>
    </div>
  );
};

export default Checkout;
