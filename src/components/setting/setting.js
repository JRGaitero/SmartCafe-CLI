import React from "react";
import { BsPencil } from "react-icons/bs";

const SettingComponent = (props) =>{
    const [settings] = React.useState(props.props)


    const cambiarValor = () =>{
        console.log(settings.url)
    }
    return(
        <div className="setting-component">
            <form className="form"  action="" method="POST" >
                <p className="input-name">{settings.name}</p>
                <label htmlFor={settings.name}>
                </label>
                <input className="input" type='text' id={settings.name} name={settings.name} placeholder={settings.name}>
                </input>
                <button type="button"  className="submit-pencil" onClick={cambiarValor}>
                    <BsPencil  className="pencil" ></BsPencil>
                </button>
            </form>
        </div>
    )
}
export default SettingComponent;
