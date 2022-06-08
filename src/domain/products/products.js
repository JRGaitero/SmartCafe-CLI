import React from "react";
import ProductComponent from "../../components/product/product";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Products = () =>{
    
    
    const [products, setProducts] = useState({});
    const [loanding, setloanding] = useState(true);

    const getProducts = async () =>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + "1|FDZGRRQGXNyeb7wsBmgsz7zEikSfYEFn9lHdZQbw"
            }
        }
        await axios.get(`http://localhost:/api/cafes/1/products`,config)
        .then(res => {
            setProducts(res.data)
            setloanding(false)
        })
    }
    
    useEffect(() => {
       getProducts()
    }, [console.log(products)]);
    
        return(
            <>
            {loanding ? 
            <div>cargando</div>
            :
            <main className="main-product">
            <link rel="stylesheet" href="css/product.css"></link>
                <section className="product">
                    
                {
                products.map((item,index)=>{
                    return <ProductComponent key={index} props ={item} ></ProductComponent>
                }) 
                }
                </section>    
            </main>}
            </>
        );

}
export default Products;