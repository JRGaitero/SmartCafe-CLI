import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {BsPersonDash} from "react-icons/bs";
import SettingStudentComponent from "../../components/settingStudent/settingStudent";
import SettingStudentComponentPassword from "../../components/settingStudent/settingStudentPassword";
import SettingStudentComponentImage from "../../components/settingStudent/settingStudentImage";

const SettingsStudent = () => {

  const [user, setUser] = useState();
  const [loading, setloading] = useState(true);
  const [headerMode] = useState('student')

  const getUser = async ()=>{
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }
    await axios.get(`http://localhost:/api/profile`,config)
      .then(res => {
        if (res.data[0].user.role !== 'student') {
          window.location.href="http://localhost:3000/products"
        }
        setUser(res.data[0])
        setloading(false)

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

  return (
    <>
      {
        loading ?
          <div>Cargando</div> :
          <>
            <Header props={user}/>
            <main className="main-settings">
              <link rel="stylesheet" href="css/setting.css"/>
              <section className="settings">
                <SettingStudentComponent props ={{name: 'Nombre', url: "url:name"}}/>
                <SettingStudentComponent props ={{name: 'Apellido', url: "url:Apellido"}}/>
                <SettingStudentComponent props ={{name: 'Curso', url: "url:Curso"}}/>
                <SettingStudentComponentPassword props ={{url: "url:contraseña"}}/>
                <SettingStudentComponentImage  props ={{url: "url:image"}}/>

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
      <Footer mode={headerMode}/>
    </>
  )
}

export default SettingsStudent