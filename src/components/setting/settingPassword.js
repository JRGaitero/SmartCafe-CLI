import React from "react";
const SettingComponentPassword = (props) =>{
    const [settings] = React.useState(props.props)


    const cambiarContraseña = ()=>{
        console.log(settings.url)
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
                    <input autoComplete="on" className="input-password" type='password' name='antigua-contraseña' placeholder="Antigua Contraseña">
                    </input>
                    <label htmlFor='nueva-contraseña'>
                    </label>
                    <input autoComplete="on"  className="input-password" type='password' name='nueva-contraseña' placeholder="Nueva Contraseña">
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