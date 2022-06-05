import React from "react";

const Header = () => {

    return (
        <header className="header">
            <link  href="css/header.css" rel="stylesheet"></link>
            <ul className="header-ul-logo">
                <img className="header-logo" alt="Logo SmartCafe" src="img/SmartCafe_Logo_1.png"></img>
            </ul>
            <ul className="header-ul">
                <h1 className="header-name">Cafe Bar la Almadraba</h1>
            </ul>
        </header>
    )
};

export default Header;