import React, { useState, Suspense } from 'react';
import { Meta } from '@storybook/react';
import { PayNow, loadStripe } from '../src';

const meta: Meta = {
  title: 'Components'
};

export default meta;

export const PayButtonComp = () => {
  const stripe = loadStripe("pk_test_51KFIbJGEf5WGtFgK16eTffksSKo1VGq25suahY5Xr6JCPvz9xdosjLSCJWhGisj2EWRQoCp16GGQPdhVuKNuVMRu00PNWqxHCe")

  const [clientSecret, setClientSecret] = useState<string>("");

  const createPaymentIntent = (amount: number) => {
    if (!clientSecret) {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:2727/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret));
    }
  }

  return <Suspense fallback={<div>Loading...</div>}>
    <PayNow
      title='Click To Pay'
      successMessage='payment done,creating order please wait....'
      stripe={stripe}
      clientSecret={clientSecret}
      onClick={() => {
        //other input field validation (like name,shipping address,etc)
        //if all field are valid then return true otherwise return false
        createPaymentIntent(55)
      }}
      onPaymentSuccess={() => {
        console.log("wow, payment done....store the order info into db now.");
      }}
    />
  </Suspense>
}
