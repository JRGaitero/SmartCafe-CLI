import React from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const SettingComponent = (props) =>{
    const [settings] = React.useState(props.props)
    const [user, setUser] = useState();

    const getUser = async ()=>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://localhost:/api/profile`,config)
        .then(res => { 
            setUser(res.data[0])
        }).catch(err=>{
            alert("Sesion Caducada")
            window.location.href = "http://localhost:3000/auth";
        });
    }
    useEffect(() => {
        getUser()
    }, [console.log()]);
    
    const cambiarValor = () =>{
        //metodo para cambiar el nombre o la direccion de una cafeteria este metodo comprueba que formulario ha introducido el usuario y cambia el valor
        if (settings.name=="Nombre"){
            const new_name=document.querySelector(`#${settings.name}`).value
            const changedUser = {}
            changedUser.name = new_name
            changedUser.location = user.location
            changedUser.is_open =user.is_open
            axios({
                method: "PUT",
                url: "http://localhost/api/cafes/"+user.id,
                data: changedUser,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                window.location.href = "http://localhost:3000/settings";
            }).catch((err)=>{
                console.log(err)
            })
        }
        if (settings.name=="Direccion"){
            const new_location=document.querySelector(`#${settings.name}`).value
            const changedUser = {}
            changedUser.name = user.name
            changedUser.location = new_location
            changedUser.is_open =user.is_open
            axios({
                method: "PUT",
                url: "http://localhost/api/cafes/"+user.id,
                data: changedUser,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                window.location.href = "http://localhost:3000/settings";
            }).catch((err)=>{

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
