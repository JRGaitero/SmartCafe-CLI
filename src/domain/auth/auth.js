import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"


const Auth = ()=>{
    //vista para la autentificaion

    const [user, setUser] = useState("user");
    const [schools, setSchools] = useState(false);


    const getSchools = async () =>{
        await axios.get(`http://localhost:/api/schools/`)
        .then(res => {
            setSchools(res.data)
        })
    }
    
    useEffect(() => {
        getSchools()
    }, [console.log(schools)]);
    
    const cambiarValor = (valor)=>{
        setUser(valor)
    }


    const createCafe = (e) =>{
        //Metodo para crear un un usuario y un nuevo cafe y guardarlo
        e.preventDefault()
        const student = {}
        let bodyFormData = new FormData();
        bodyFormData.append('email', document.querySelector("#email").value)
        bodyFormData.append('password',document.querySelector("#password").value)
        bodyFormData.append('phoneNumber', document.querySelector("#phoneNumber").value)
        if(document.querySelector("#profile_pic").value){
            bodyFormData.append('profile_pic', document.querySelector("#profile_pic").value)
        }
        bodyFormData.append('role',document.querySelector("#role").value)

        axios({
            method: "post",
            url: "http://localhost/api/register",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res=>{
            localStorage.setItem("token",res.data.access_token)
            

            bodyFormData = new FormData();

            bodyFormData.append('name', document.querySelector("#name").value)
            bodyFormData.append('location',document.querySelector("#location").value)
            bodyFormData.append('user_id',res.data.data.id)
            localStorage.setItem('user_id', res.data.data.id)
            bodyFormData.append('is_open',document.querySelector("#is_open").value)
            axios({
                method: "post",
                url: "http://localhost/api/cafes",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data",'Authorization': 'Bearer ' + localStorage.getItem("token") },
            }).then(res=>{
                localStorage.setItem("cafe_id",res.data)
                localStorage.setItem('name', document.querySelector("#name").value)
                localStorage.setItem('location', document.querySelector("#location").value)
                localStorage.setItem('is_open', document.querySelector("#is_open").value)
                localStorage.setItem('password', document.querySelector("#password").value)


                window.location.href="http://localhost:3000/products";

            })
            })
    }
    const createStudent = (e) =>{
        //Metodo para crear un un usuario y un nuevo student y guardarlo
        e.preventDefault()
        let bodyFormData = new FormData();
        bodyFormData.append('email', document.querySelector("#email").value)
        bodyFormData.append('password',document.querySelector("#password").value)
        bodyFormData.append('phoneNumber', document.querySelector("#phoneNumber").value)
        if(document.querySelector("#profile_pic").value){
            bodyFormData.append('profile_pic', document.querySelector("#profile_pic").value)
        }
        bodyFormData.append('role',document.querySelector("#role").value)

        axios({
            method: "post",
            url: "http://localhost/api/register",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res=>{
            console.log(res.data)

            localStorage.setItem("token",res.data.access_token)

            bodyFormData = new FormData();

            bodyFormData.append('name', document.querySelector("#name").value)
            bodyFormData.append('surname',document.querySelector("#surname").value)
            bodyFormData.append('user_id',res.data.data.id)
            bodyFormData.append('course', document.querySelector("#course").value)
            bodyFormData.append('birthday',document.querySelector("#birthday").value)
            bodyFormData.append('school_id',document.querySelector("#School").value)


            axios({
                method: "post",
                url: "http://localhost/api/students",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data",'Authorization': 'Bearer ' + localStorage.getItem("token") },
            }).then(res=>{
                console.log(res.status)
                localStorage.setItem("name", document.querySelector("#name").value)
                localStorage.setItem("student_id",res.data)

                window.location.href="http://localhost:3000/cafes";
            })
            })

            

    }

    const login = (e) =>{
        //metodo para hacer login
        e.preventDefault()
        let bodyFormData = new FormData();
        bodyFormData.append('email', document.querySelector("#login-email").value)
        bodyFormData.append('password',document.querySelector("#login-password").value)
   
        axios({
            method: "post",
            url: "http://localhost/api/login",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res=>{
            localStorage.setItem("token",res.data.access_token);
            window.location.href="http://localhost:3000/products";


          })
    }
    return(
        <>
            <link rel="stylesheet" href="css/auth.css"></link>
        {schools ? 
            <main className="main-auth-form">
            <header className="auth-headr">
                <h1>Smart Cafe</h1>
            </header>
            <section className="auth-login">
                <h2>login</h2>
                <form className="form-login" onSubmit={login}>
                    <label htmlFor="login-email">Correo Electronico: <input id="login-email" type="text"></input></label>
                    <label htmlFor="login-password">Contraseña: <input  id="login-password" type="password"></input></label>
                    <input type='submit' value="Enviar" ></input>
                </form>
            </section>
            <section className="auth-chageform">
            <ul  className="change-form">
                <li>
                    <a onClick={()=>cambiarValor("user")}>Registro Alumno</a>
                </li>
                <p></p>
                <li>
                    <a onClick={()=>cambiarValor("cafe")} >Registro Cafeteria</a>
                </li>
            </ul>
            </section>

            {
                user==="user"?
                <section>
                    <h2>
                        Registro Para Usuario
                    </h2>
                    <form className="form-create-student" onSubmit={createStudent} encType="multipart/form-data">
                        <label htmlFor="email">Correo Electronico: <input id="email" type="text"></input></label>
                        <label htmlFor="name">Nombre: <input id="name" type="text"></input></label>
                        <label htmlFor="surname">Apellido: <input id="surname" type="text"></input></label>
                        <label htmlFor="course">Curso: <input id="course" type="text"></input></label>
                        <label htmlFor="School">                                
                        Escuela:
                            <select id="School">
                                {
                                    schools.map((item , index)=>{
                                        return <option key={index} value={item.id}> {item.name}</option>
                                    })
                                }
                            </select>
                        </label>
                        <label htmlFor="birthday">Fecha de Nacimiento: <input id="birthday" type="date"></input></label>
                        <label htmlFor="password">Contraseña: <input autoComplete="On" id="password" type="password"></input></label>
                        <label htmlFor="phoneNumber" >Telefono: <input id="phoneNumber" type="text"></input></label>
                        <label htmlFor="role"><input defaultValue="student" id="role" hidden={true} type="text"></input></label>
                        <label htmlFor="profile_pic">Foto de Perfil: <input id="profile_pic" type="file"></input></label>
                        <input type='submit' value="Enviar" ></input>
                    </form>
                </section>
                :
                <section>
                    <h2>
                        Registro Para Cafeteria
                    </h2>
                    <form  className="form-create-cafe" onSubmit={createCafe}  encType="multipart/form-data">
                        <label htmlFor="email">Correo Electronico: <input id="email" type="text"></input></label>
                        <label htmlFor="name">Nombre: <input id="name" type="text"></input></label>
                        <label htmlFor="location">Ubicacion: <input id="location" type="text"></input></label>
                        <label htmlFor="is_open"><input hidden={true} id="is_open" defaultValue={1} ></input></label>
                        <label htmlFor="password">Contraseña: <input id="password" type="password"></input></label>
                        <label htmlFor="phoneNumber" >Telefono: <input id="phoneNumber" type="text"></input></label>
                        <label htmlFor="role"><input defaultValue="cafe" id="role" hidden={true} type="text"></input></label>
                        <label htmlFor="profile_pic">Foto de Perfil: <input id="profile_pic" type="file"></input></label>
                        <input type='submit' value="Enviar" ></input>
                    </form>
                </section>
            }
        </main>
        :
        <h1>cargando</h1>
        }
        </>
       
    )
}

export default Auth;