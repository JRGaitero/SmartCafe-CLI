import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const NewProduct = () =>{
    const [user, setUser] = useState();
    const [form, setform] = useState(false);

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

    const crearProduct = (e) =>{
        //Creacion del nuevo producto recogiendo los datos introducidos en el formulario
        e.preventDefault()
        console.log(user)

        let bodyFormData = new FormData();
        bodyFormData.append('price', document.querySelector("#price").value)
        bodyFormData.append('name',document.querySelector("#name").value)
        bodyFormData.append('description', document.querySelector("#description").value)
        bodyFormData.append('category', document.querySelector("#category").value)
        bodyFormData.append("cafe_id",user.id)
        bodyFormData.append("image",document.querySelector("#image").files[0])

        axios({
            method: "post",
            url: "http://192.168.243.36/api/products",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
          }).then(res=>{
            console.log(res)
            window.location.href = "http://192.168.243.36:3000/products";
        }).catch((err)=>{
            console.log(err)
        })


    }
    const añadirProducto = (e) =>{
        //Metodo para mostrar o no mostrar el formulario para añadir un nuevo producto
       if(form){
           setform(false)
           return
       }else{
           setform(true)
           return
       }




    }
    return (
        <>
      {form ? 
        <div className="div-product-form-hidden">
        <form onSubmit={crearProduct} className="product-form" >
            <label  htmlFor="cafe-id" className="label-product-form">
                <input id="cafe-id" name="cafe-id" defaultValue={localStorage.getItem("cafe_id")} hidden={true} /> 
            </label>
            <label className="label-product-form"  htmlFor="name">
                Nombre:
                <input className="form-product-input" type='text' id="name" name="name"/>    
            </label>
            <label className="label-product-form" htmlFor = "price">
                Precio:
                <input className="form-product-input" type='number' id="price" name="price" />
            </label>    
            <label className="label-product-form" htmlFor = "description">
                Descripcion:
                <input className="form-product-input" type='text' id="description" name="description"/>
            </label>
            <label className="label-product-form" htmlFor ="category">
                Categoria:
                <input className="form-product-input" type="text" id="category" name="category" />
            </label>
            <label htmlFor="image">Foto de Perfil: <input id="image" type="file"></input></label>

            <input type="submit" className="form-product-submit" value="Guardar Producto "/>
        </form>
    </div>:
    <div></div>
      }
        <div className="button-new-product" onClick={añadirProducto}>
            <section>
                <p>Añadir un nuevo producto</p>
            </section>
        </div>
        </>
        )

}

export default NewProduct;