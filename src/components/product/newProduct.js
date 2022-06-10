import React from "react";
import axios from "axios";


const NewProduct = () =>{

    const crearProduct = (e) =>{
        e.preventDefault()
        let bodyFormData = new FormData();
        bodyFormData.append('price', document.querySelector("#price").value)
        bodyFormData.append('name',document.querySelector("#name").value)
        bodyFormData.append('description', document.querySelector("#description").value)
        bodyFormData.append('category', document.querySelector("#category").value)
        bodyFormData.append('image',document.querySelector("#image").value)
        bodyFormData.append("cafe_id",localStorage.getItem("cafe_id"))
        axios({
            method: "post",
            url: "http://localhost/api/register",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(res=>{
            localStorage.setItem("token",res.data.access_token)
            window.location.href="http://localhost:3000/products";
        })


    }
    const añadirProducto = (e) =>{
        e.preventDefault()
        const div = document.querySelector(".button-new-product")
        
        if(document.querySelector(".div-product-form")){
            const main = document.querySelector(".main-product")
            const form = document.querySelector(".div-product-form")

            main.removeChild(form)
            return
        }


        const form = `<div class="div-product-form">
        <form onSubmit=${crearProduct} class="product-form"" encType="multipart/form-data">
            <label  for="cafe-id" class="label-product-form">
                <input id="cafe-id" name="cafe-id" value="1" hidden='true'>

                </input>
            </label>
            <label class="label-product-form"  for="name">
                Nombre:
                <input class="form-product-input" type='text' id="name" name="name">

                </input>    
            </label>
            <label class="label-product-form" for = "price">
                Precio:
                <input class="form-product-input" type='number' id="price" name="price" >

                </input>
            </label>    
            <label class="label-product-form" for = "description">
                Descripcion:
                <input class="form-product-input" type='text' id="description" name="description">

                </input>
            </label>
            <label class="label-product-form" for ="category">
                Categoria:
                <input class="form-product-input" type="text" id="category" name="category" >

                </input>
            </label>
            <label class="label-product-form" for="image">
                Imagen del producto:
                <input class="form-product-input-image" type='file' id="image" name="image" value="img/default-imge.jpg" >

                </input>
            </label>
            <input type="submit" class="form-product-submit" value="Guardar Producto "></input>
        
        </form>
    </div>`

        div.insertAdjacentHTML("beforeBegin",form)
    }
    return (
        <div className="button-new-product" onClick={añadirProducto}>
            <section>
                <p>Añadir un nuevo producto</p>
            </section>
        </div>
        )

}

export default NewProduct;