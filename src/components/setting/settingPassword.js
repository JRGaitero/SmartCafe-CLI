import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const SettingComponentPassword = (props) =>{
    const [settings] = React.useState(props.props)
    const [user, setUser] = useState();

    const getUser = async ()=>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://192.168.243.36:/api/profile`,config)
        .then(res => { 
            setUser(res.data[0])
        }).catch(err=>{
            alert("Sesion Caducada")
            window.location.href = "http://192.168.243.36:3000/auth";
        });
    }
    useEffect(() => {
        getUser()
    }, [console.log()]);


    const cambiarContraseña = ()=>{
        //metodo para cambiar la contraseña del usuario este comprueba antes la antigua contraseña
       
            const newPassword=document.querySelector("#nueva-contraseña").value
            const password=document.querySelector("#antigua-contraseña").value
            const user = {}
            user.newPassword = newPassword
            user.password = password

            console.log(user)
            axios({
                method: "POST",
                url: "http://192.168.243.36/api/users/password",
                data: user,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                console.log(res)
                alert("Contraseña Cambiada")

                window.location.href = "http://192.168.243.36:3000/settings";
            }).catch((err)=>{
                console.log(err)
                alert("Contraseña Incorrecta")
            })
        
    }
    return(
        <div className="setting-component-password">
            <form className="form-contraseña"  action="" method="POST">
                <section className="section-password-cambiar">
                    <p>Cambiar Contraseña</p>
                </section>
                <section className="section-both-password">
                    <label  htmlFor='antigua-contraseña'>
                    </label>
                    <input autoComplete="on" className="input-password" type='password' id='antigua-contraseña' name='antigua-contraseña' placeholder="Antigua Contraseña">
                    </input>
                    <label htmlFor='nueva-contraseña'>
                    </label>
                    <input autoComplete="on"  className="input-password" type='password' name='nueva-contraseña'  id='nueva-contraseña' placeholder="Nueva Contraseña">
                    </input>
                </section>
                <section  className="section-password-button">
                    <button type="button"  onClick={cambiarContraseña} className="button-password">Cambiar</button>
                </section>

            </form>
        </div>
    )
}
export default SettingComponentPassword;