import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { ShopContextProvider } from "./context/shopContext";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Purchased from "./pages/Purchased";
import Shop from "./pages/Shop";
import "./App.css";

function App() {
  return (
    <div>
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/purchased-items" element={<Purchased />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
