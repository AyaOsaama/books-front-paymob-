import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
