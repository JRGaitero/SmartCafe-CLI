import React from "react";
import ProductComponent from "../../components/product/product";
import axios from "axios";
import NewProduct from  "../../components/product/newProduct";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"



const Products = () =>{
    
    
    const [products, setProducts] = useState({});
    const [loanding, setloanding] = useState(true);

    const getProducts = async () =>{
        //metodo para obetener los produtos de una cafeteria
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://localhost:/api/cafes/${localStorage.getItem("cafe_id")}/products`,config)
        .then(res => {
            setProducts(res.data)
            setloanding(false)
        }).catch(err=>{
            console.log(err);
            console.log(localStorage.getItem("cafe_id"))
            localStorage.removeItem("token")
            localStorage.removeItem("cafe_id");
            localStorage.removeItem("name");
            localStorage.removeItem("is_open");
            localStorage.removeItem("location");
            window.location.href = "http://localhost:3000/auth";

        })
    }
    
    useEffect(() => {
       getProducts()
    }, [console.log(products)]);

    if(localStorage.getItem("token")===null){
        window.location.href = "http://localhost:3000/auth";
    }
        return(
            <>
            <Header />
            {loanding ? 
            <div>cargando</div>
            :
            <main className="main-product">
            <link rel="stylesheet" href="css/product.css"></link>
            <NewProduct></NewProduct>
                <section className="product">
                    
                {
                products.map((item,index)=>{
                    return <ProductComponent key={index} props ={item} ></ProductComponent>
                }) 
                }
                </section>    
            </main>}
            <Footer />

            </>
        );

}
export default Products;