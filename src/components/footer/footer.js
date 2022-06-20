import React from "react";
import { Link} from "react-router-dom"
import {AiOutlineSetting, AiOutlineShoppingCart} from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineCoffee } from "react-icons/ai";



const Footer = (props) =>{
  const [mode] = React.useState(props.mode)

    //Creacion footer para cafes este redirije a las 3 areaas principales de la aplicacion para cafe
    return(
        <footer className="footer">
            <link rel="stylesheet" href="css/footer.css"></link>
            <div  className="footer-div">
              {
                mode === 'cafe' ?
                  <nav >
                    <ul className="footer-nav">
                      <ol className="footer-icon">
                        <Link to="/orders">
                          <AiOutlineShop/>
                        </Link>
                      </ol>
                      <ol className="footer-icon">
                        <Link to="/products">
                          <AiOutlineCoffee/>
                        </Link>
                      </ol>
                      <ol className="footer-icon">
                        <Link to="/settings">
                          <AiOutlineSetting/>
                        </Link>
                      </ol>
                    </ul>
                  </nav>
                  :
                  <nav >
                    <ul className="footer-nav">
                      <ol className="footer-icon">
                        <Link to="/shopping-cart">
                          <AiOutlineShoppingCart/>
                        </Link>
                      </ol>
                      <ol className="footer-icon">
                        <Link to="/cafes">
                          <AiOutlineCoffee/>
                        </Link>
                      </ol>
                      <ol className="footer-icon">
                        <Link to="/settings-student">
                          <AiOutlineSetting/>
                        </Link>
                      </ol>
                    </ul>
                  </nav>
              }

            </div>
        </footer>

    )
};

export default Footer;