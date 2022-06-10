import Orders  from "./domain/orders/orders";
import Settings from "./domain/settings/settings";
import Products  from "./domain/products/products";
import './App.css';
import { Navigate } from "react-router-dom";

import Auth from './domain/auth/auth'

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Cafes from "./domain/cafes/cafes";

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/auth" element={<Auth />}/>
            <Route path="/cafes" element={<Cafes />}/>
            <Route path="*" element={<Navigate to ="/auth" />}/>
        </Routes>   
      </Router> 
    </>
  );
}

export default App;
