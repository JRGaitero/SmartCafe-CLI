import React from "react";

const Header = () => {
    //Creacion heeader para cafes estemuestra el logo de la app y el nombre del cafe

    return (
        <header className="header">
            <link  href="css/header.css" rel="stylesheet"></link>
            <ul className="header-ul-logo">
                <img className="header-logo" alt="Logo SmartCafe" src="img/SmartCafe_Logo_1_sinFondo.png"></img>
            </ul>
            <ul className="header-ul">
                <h1 className="header-name">{localStorage.getItem("name")}</h1>
            </ul>
        </header>
    )
};

export default Header;