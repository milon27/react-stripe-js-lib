import React from "react";
import { loadStripe } from "@stripe/stripe-js";
const PayNow = React.lazy(() => import("./component/PayNow"));

export { loadStripe, PayNow }