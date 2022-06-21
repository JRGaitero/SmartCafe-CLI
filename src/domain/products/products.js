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
    const [user, setUser] = useState();
    const [headerMode] = useState('cafe')
    let tempUser = {}

    const getUser = async ()=>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://192.168.243.36:/api/profile`,config)
        .then(res => {
            if (res.data[0].user.role !== 'cafe') {
                window.location.href="http://192.168.243.36:3000/cafes"
            }
            setUser(res.data[0])
            tempUser = res.data[0]
            getProducts()

        }).catch(err=>{
            console.log(err)
            alert("Sesion Caducada")
            window.location.href = "http://192.168.243.36:3000/auth";
        });
    }

    const getProducts = async () =>{
        //metodo para obetener los produtos de una cafeteria
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://192.168.243.36:/api/cafes/${tempUser.id}/products`,config)
        .then(res => {
            setProducts(res.data)
            setloanding(false)
        }).catch(err=>{
            
            window.location.href = "http://192.168.243.36:3000/auth";

        })
    }
    
    useEffect(() => {
        getUser()
    }, [console.log()]);

    if(localStorage.getItem("token")===null){
        window.location.href = "http://192.168.243.36:3000/auth";
    }
        return(
            <>
            {loanding ? 
            <div>cargando</div>
            :
            <>
            <Header props={user}/>
            <main className="main-product">
            <link rel="stylesheet" href="css/product.css"></link>
            <NewProduct></NewProduct>
                <section className="product">
                    
                {
                products.map((item,index)=>{
                    return <ProductComponent key={index} props ={item} mode={null}></ProductComponent>
                }) 
                }
                </section>    
            </main>
            </>
            }
            <Footer mode={headerMode}/>
            </>
        );

}
export default Products;