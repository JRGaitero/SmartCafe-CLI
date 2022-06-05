import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineCoffee } from "react-icons/ai";

import Orders  from "../../domain/orders/orders";
import Settings from "../../domain/settings/settings";

const Footer = () =>{

    return(
        <Router>
        <footer className="footer">
            <link rel="stylesheet" href="css/footer.css"></link>
                <nav > 
                    <ul className="footer-nav">
                        <ol className="footer-icon">
                        <Link to="/orders">
                            <AiOutlineShop></AiOutlineShop>
                        </Link>
                        </ol>
                        <ol className="footer-icon">
                            <AiOutlineCoffee></AiOutlineCoffee>
                        </ol>
                        <ol className="footer-icon">
                        <Link to="/settings">
                            <AiOutlineSetting></AiOutlineSetting>
                        </Link>
                        </ol>
                    </ul>
                </nav>
        </footer>
        <Routes>
                    <Route path="/orders" element={<Orders />}/>
                    <Route path="/settings" element={<Settings />}/>
                </Routes>    
            </Router>
    )
};

export default Footer;