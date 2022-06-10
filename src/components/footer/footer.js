import React from "react";
import { Link} from "react-router-dom"
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineCoffee } from "react-icons/ai";



const Footer = () =>{

    //Creacion footer para cafes este redirije a las 3 areaas principales de la aplicacion para cafe
    return(
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
                        <Link to="/products">
                            <AiOutlineCoffee></AiOutlineCoffee>
                        </Link>
                        </ol>
                        <ol className="footer-icon">
                        <Link to="/settings">
                            <AiOutlineSetting></AiOutlineSetting>
                        </Link>
                        </ol>
                    </ul>
                </nav>
        </footer>

    )
};

export default Footer;