import React from "react";
import OrderComponent from "../../components/order/order";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Orders = () =>{
    
    const [orders, setorders] = useState({});
    const [loanding, setloanding] = useState(true);

    const getProducts = async () =>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + "1|FDZGRRQGXNyeb7wsBmgsz7zEikSfYEFn9lHdZQbw"
            }
        }
        await axios.get(`http://localhost:/api/cafes/1/orders`,config)
        .then(res => {
            setorders(res.data)
            setloanding(false)
        })
    }
    
    useEffect(() => {
       getProducts()
    }, [console.log(orders)]);
    return(
        <>
        {loanding ? 
            <div>cargando</div>
            :
            <main className="main-order">
            <link rel="stylesheet" href="css/order.css"></link>
                <section className="order">
                    {orders.map((item, index)=>
                        <OrderComponent key={index} props ={item}/>
                    )}
                </section>    
            </main>
        }
        </>
    )
};

export default Orders;