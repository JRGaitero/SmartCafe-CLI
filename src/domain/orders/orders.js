import React from "react";
import OrderComponent from "../../components/order/order";
import axios from "axios";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


const Orders = () =>{
    
    const [orders, setorders] = useState([]);
    const [loanding, setloanding] = useState(true);

    const getProducts = async () =>{
        //metodo para obetner los pedidos asiociados a un cafe
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://localhost:/api/cafes/${localStorage.getItem("cafe_id")}/orders`,config)
        .then(res => {
            setorders(res.data)
            setloanding(false)
        }).catch(err=>{
            console.log(err)
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
    }, [console.log(orders)]);
    if(localStorage.getItem("token")===null){
        return <Navigate to='/Auth' replace={true} />;
    }
    return(
        <>            
        <Header />
        <link rel="stylesheet" href="css/order.css"></link>

        {loanding ? 
            <div>cargando</div>
            :
            orders ?
            <h2 className="no-products">No hay Pedidos todavia</h2>
            :
            <main className="main-order">
                <section className="order">
                    {orders.map((item, index)=>
                        <OrderComponent key={index} props ={item}/>
                    )}
                </section>    
            </main>
        }
        <Footer />
        </>
    )
};

export default Orders;