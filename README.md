# React Stripe Element Wrapper
Compitable with react js and next js.

## Installation Commands

```bash
npm install react-stripe-js
```

### How to use

1. import css in index.js/ts or app.jsx or app.tsx.

```ts
import 'react-stripe-js/dist/style.css';
```
2. use

```tsx
import React, { useState } from 'react';
import { PayNow, loadStripe } from 'react-stripe-js';

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

  return <>
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
  </>
}


```
3. backend api should look like this

```ts
import express from 'express'
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()
const stripe = new Stripe(`${process.env.STRIPE_SKEY}`, {
    apiVersion: '2020-08-27',
});
const app = express()
app.use(cors({ origin: true }))
app.use(express.json());


app.get('/', (req, res) => {
    res.send("okk")
})
app.post("/create-payment-intent", async (req, res) => {
    const amount = req.body.amount
    console.log(amount);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * amount,//amount usd
        currency: "usd",
        // payment_method: "card"
        automatic_payment_methods: {
            enabled: true
        }
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


const port = process.env.PORT || 2828
app.listen(port, () => console.log("running on app:" + port))

```



> screenshot 1

![screenshot](screenshot.png)


### Author 

[Milon27](https://milon27.com)
Available for remote work [Contact Milon27](https://milon27.com)