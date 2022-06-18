import React from "react";
import SettingComponentPassword from '../../components/setting/settingPassword'
import SettingComponentImage from '../../components/setting/settingImage'
import SettingComponent from '../../components/setting/setting'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Navigate } from "react-router-dom";
import axios from "axios";


const Settings = () =>{
    //metodo para comprobar que estas logeado
    let config = {
        headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }
    axios.get(`http://localhost:/api/cafes/${localStorage.getItem("cafe_id")}/orders`,config)
    .then(res => {
        console.log(res.data)
    }).catch(err=>{
        console.log(err)
        localStorage.removeItem("token")
        localStorage.removeItem("cafe_id");
        localStorage.removeItem("name");
        localStorage.removeItem("is_open");
        localStorage.removeItem("location");
        window.location.href = "http://localhost:3000/auth";
    })
    if(localStorage.getItem("token")===null){
        return <Navigate to='/Auth' replace={true} />;
    }
    if(localStorage.getItem("token")===null){
        return <Navigate to='/Auth' replace={true} />;
    }

    const logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("cafe_id");
        localStorage.removeItem("name");
        localStorage.removeItem("is_open");
        localStorage.removeItem("location");
        window.location.href = "http://localhost:3000/auth";
    }

    return(
        <>
        <Header />
        <main className="main-settings">
        <link rel="stylesheet" href="css/setting.css"></link>
        <section className="settings">
                <SettingComponent props ={{name:'Nombre',url:"url:name"}}></SettingComponent>
                <SettingComponent props ={{name:'Direccion',url:"url:Direccion"}}></SettingComponent>
                <SettingComponentPassword props ={{url:"url:contraseña"}}></SettingComponentPassword>
                <SettingComponentImage  props ={{url:"url:image"}}></SettingComponentImage>
        </section>
       
        </main>
        <Footer />
        </>
    )
};

export default Settings;