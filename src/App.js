import Orders  from "./domain/orders/orders";
import Settings from "./domain/settings/settings";
import Products  from "./domain/products/products";
import Cafes  from "./domain/cafes/cafes";
import CafeProducts  from "./domain/cafeProducts/cafeProducts";

import './App.css';
import { Navigate } from "react-router-dom";

import Auth from './domain/auth/auth'

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import ShoppingCart from "./domain/shoppingCart/shoppingCart";

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/cafes" element={<Cafes />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/cafe-products" element={<CafeProducts />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/auth" element={<Auth />}/>
            <Route path="/shopping-cart" element={<ShoppingCart/>}/>
            <Route path="*" element={<Navigate to ="/auth" />}/>
        </Routes>   
      </Router> 
    </>
  );
}

export default App;
