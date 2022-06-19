import React from "react";
import SettingComponentPassword from '../../components/setting/settingPassword'
import SettingComponentImage from '../../components/setting/settingImage'
import SettingComponent from '../../components/setting/setting'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BsPersonDash } from "react-icons/bs";



const Settings = () =>{
    //metodo para comprobar que estas logeado
    const [user, setUser] = useState();
    const [loanding, setloanding] = useState(true);

    const getUser = async ()=>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://localhost:/api/profile`,config)
        .then(res => { 
            setUser(res.data[0])
            setloanding(false)

        }).catch(err=>{
            alert("Sesion Caducada")
            window.location.href = "http://localhost:3000/auth";
        });
    }
    useEffect(() => {
        getUser()
    }, [console.log()]);


    const cerrarSesion = () =>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        axios.get(`http://localhost:/api/logout`,config)
        .then(res => { 
            localStorage.removeItem("token")
            window.location.href = "http://localhost:3000/auth";
        }).catch(err=>{
            localStorage.removeItem("token")
            window.location.href = "http://localhost:3000/auth";
        });

    }

    return(
        <>
        {loanding ? 
        <div>cargando</div>
        :
        <>
        <Header props={user}/>
        <main className="main-settings">
        <link rel="stylesheet" href="css/setting.css"></link>
        <section className="settings">
                <SettingComponent props ={{name:'Nombre',url:"url:name"}}></SettingComponent>
                <SettingComponent props ={{name:'Direccion',url:"url:Direccion"}}></SettingComponent>
                <SettingComponentPassword props ={{url:"url:contraseña"}}></SettingComponentPassword>
                <SettingComponentImage  props ={{url:"url:image"}}></SettingComponentImage>
                <div className="setting-component">
                    <form className="form-logout"  action="" method="POST" >
                        <p className="input-logout">Cerrar Sesion</p>
                        <button type="button"  className="submit-pencil" onClick={cerrarSesion}>
                            <BsPersonDash  className="pencil" ></BsPersonDash>
                        </button>
                    </form>
                </div>
        </section>
        </main>
        </>
        }
        <Footer />
        </>
    )
};

export default Settings;