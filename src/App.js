import "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

import "./styles/styles.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </div>
  );
}
