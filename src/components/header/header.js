import React from "react";

const Header = (props) => {
    const [user] = React.useState(props.props)

    //Creacion heeader para cafes estemuestra el logo de la app y el nombre del cafe

    return (
        <>
        <header className="header">
            <div className="header-div"    >
                <link  href="css/header.css" rel="stylesheet"></link>
                <ul className="header-ul-logo">
                    <img className="header-logo" alt="Logo SmartCafe" src="img/SmartCafe_Logo_1_sinFondo.png"></img>
                </ul>
                {
                user.user.profile_pic ===undefined ?
                <ul className="header-ul"  style={{backgroundImage: `url(http://localhost${user.user.profile_pic})`}}>
                    <div >
                            <h1 className="header-name">{user.name}</h1>
                            <h2 className="header-location">{user.location}</h2>
                    </div>
                    </ul>
                :
                <ul className="header-ul">
                      <div >
                            <h1 className="header-name">{user.name}</h1>
                            <h2 className="header-location">{user.location}</h2>
                    </div>
                </ul>
                }                  
            </div>
        </header>
        </>
    )
};

export default Header;