import React from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";


const SettingComponent = (props) =>{
    const [settings] = React.useState(props.props)

    console.log(settings)
    const cambiarValor = () =>{
        //metodo para cambiar el nombre o la direccion de una cafeteria este metodo comprueba que formulario ha introducido el usuario y cambia el valor
        if (settings.name=="Nombre"){
            const new_name=document.querySelector(`#${settings.name}`).value
            const user = {}
            user.name = new_name
            user.location = localStorage.getItem("location")
            user.is_open = localStorage.getItem("is_open")
            console.log(user)
            axios({
                method: "PUT",
                url: "http://localhost/api/cafes/"+localStorage.getItem("cafe_id"),
                data: user,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                console.log(res)
                localStorage.removeItem("name")
                localStorage.setItem("name",new_name)
                window.location.href = "http://localhost:3000/settings";
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (settings.name=="Direccion"){
            const new_location=document.querySelector(`#${settings.name}`).value
            const user = {}
            user.location = new_location
            user.name = localStorage.getItem("name")
            user.is_open = localStorage.getItem("is_open")
            console.log(user)
            axios({
                method: "PUT",
                url: "http://localhost/api/cafes/"+localStorage.getItem("cafe_id"),
                data: user,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                console.log(res)
                localStorage.removeItem("location")
                localStorage.setItem("location",new_location)
                window.location.href = "http://localhost:3000/settings";
            }).catch((err)=>{
                console.log(err)
            })
        }
    
        
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
