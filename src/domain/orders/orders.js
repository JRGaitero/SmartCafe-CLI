import React from "react";
import OrderComponent from "../../components/order/order";
import axios from "axios";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


const Orders = () =>{
    
    const [orders, setorders] = useState({});
    const [loanding, setloanding] = useState(true);

    const getProducts = async () =>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://localhost:/api/cafes/1/orders`,config)
        .then(res => {
            setorders(res.data)
            setloanding(false)
        }).catch(err=>{
            console.log(err)
            localStorage.removeItem("token")
            localStorage.removeItem("cafe_id");
            return <Navigate to='/Auth' replace={true} />;

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
        <Footer />
        </>
    )
};

export default Orders;