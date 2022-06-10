import React from "react";
import SettingComponentPassword from '../../components/setting/settingPassword'
import SettingComponentImage from '../../components/setting/settingImage'
import SettingComponent from '../../components/setting/setting'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Navigate } from "react-router-dom";


const Settings = () =>{
    if(localStorage.getItem("token")===null){
        return <Navigate to='/Auth' replace={true} />;
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