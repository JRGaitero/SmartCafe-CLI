import React from "react";
import SettingComponentPassword from '../../components/setting/settingPassword'
import SettingComponentImage from '../../components/setting/settingImage'
import SettingComponent from '../../components/setting/setting'

const Settings = () =>{

    return(
        <>
        <main className="main-settings">
        <link rel="stylesheet" href="css/setting.css"></link>
        <section className="settings">
                <SettingComponent props ={{name:'Nombre',url:"url:name"}}></SettingComponent>
                <SettingComponent props ={{name:'Direccion',url:"url:Direccion"}}></SettingComponent>
                <SettingComponentPassword props ={{url:"url:contraseña"}}></SettingComponentPassword>
                <SettingComponentImage  props ={{url:"url:image"}}></SettingComponentImage>
        </section>
        </main>
        </>
    )
};

export default Settings;