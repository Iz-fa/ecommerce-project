import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { ErrorPage } from './pages/ErrorPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  window.axios= axios;  //  
  // this makes axios available in the console, shortcut for window.axios: "axios"
  // window is the browser window


  const loadCart = async () => {
    // The backend received 2 informations from the request: the type: get and the url path:/api/cart-items?expand=product
    // The type is also called http method (get,post,put,delete)
    // ?expand is a query parameter. it lets us add additional info to our request
    const response = await axios.get('/api/cart-items?expand=product') 
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<ErrorPage cart={cart} />} />
    </Routes>

  )
}

//:orderId and :productId are URL params

export default App
