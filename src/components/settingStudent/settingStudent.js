import React from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const SettingStudentComponent = (props) => {
  const [settings] = React.useState(props.props)
  const [user, setUser] = useState();

  const getUser = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    }
    await axios.get(`http://localhost:/api/profile`, config)
      .then(res => {
        setUser(res.data[0])
      }).catch(err => {
        alert("Sesion Caducada")
        window.location.href = "http://localhost:3000/auth";
      });
  }
  useEffect(() => {
    getUser()
  }, [console.log()]);

  const cambiarValor = () => {
    if (settings.name === "Nombre") {
      const new_name = document.querySelector(`#${settings.name}`).value
      const changedUser = {}
      changedUser.name = new_name
      changedUser.surname = user.surname
      changedUser.course = user.course
      axios({
        method: "PUT",
        url: "http://localhost/api/students/" + user.id,
        data: changedUser,
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + localStorage.getItem("token")},
      }).then(res => {
        window.location.href = "http://localhost:3000/settings-student";
      }).catch((err) => {
        console.log(err)
      })
    }
    if (settings.name === "Apellido") {
      const new_surname = document.querySelector(`#${settings.name}`).value
      const changedUser = {}
      changedUser.name = user.name
      changedUser.surname = new_surname
      changedUser.course = user.course
      axios({
        method: "PUT",
        url: "http://localhost/api/students/" +user.id,
        data: changedUser,
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + localStorage.getItem("token")},
      }).then(res => {
        window.location.href = "http://localhost:3000/settings-student";
      }).catch((err) => {

      })
    }
    if (settings.name === "Curso") {
      const new_course = document.querySelector(`#${settings.name}`).value
      const changedUser = {}
      changedUser.name = user.name
      changedUser.surname = user.surname
      changedUser.course = new_course
      axios({
        method: "PUT",
        url: "http://localhost/api/students/" + user.id,
        data: changedUser,
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + localStorage.getItem("token")},
      }).then(res => {
        window.location.href = "http://localhost:3000/settings-student";
      }).catch((err) => {

      })
    }
  }

  return (
    <div className="setting-component">
      <form className="form"  action="" method="POST" >
        <p className="input-name">{settings.name}</p>
        <label htmlFor={settings.name}>
        </label>
        <input className="input" type='text' id={settings.name} name={settings.name} placeholder={settings.name}>
        </input>
        <button type="button"  className="submit-pencil" onClick={cambiarValor}>
          <BsPencil  className="pencil" />
        </button>
      </form>
    </div>
  )
}

export default SettingStudentComponent