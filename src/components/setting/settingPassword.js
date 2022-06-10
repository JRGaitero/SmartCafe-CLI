import React from "react";
import axios from "axios";

const SettingComponentPassword = (props) =>{
    const [settings] = React.useState(props.props)


    const cambiarContraseña = ()=>{
        //metodo para cambiar la contraseña del usuario este comprueba antes la antigua contraseña
       
        if(document.querySelector("#antigua-contraseña").value!=localStorage.getItem("password")){
            alert("Contraseña antigua incorrecta")
        }else{
            const new_password=document.querySelector("#nueva-contraseña").value
            const user = {}
            user.pasword = new_password
            console.log(user)
            axios({
                method: "PUT",
                url: "http://localhost/api/users/"+localStorage.getItem("user_id"),
                data: user,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                console.log(res)
                localStorage.removeItem("password")
                localStorage.setItem("password",new_password)
                alert("Contraseña Cambiada")

                window.location.href = "http://localhost:3000/settings";
            }).catch((err)=>{
                console.log(err)
            })
        }
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