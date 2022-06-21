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
    const [user, setUser] = useState();
    const [headerMode] = useState('cafe')
    let tempUser = {}
    let tempOrders = []

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
            alert("Sesion Caducada")
            window.location.href = "http://192.168.243.36:3000/auth";
        });
    }

    const getProducts = async () =>{
        //metodo para obetner los pedidos asiociados a un cafe
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://192.168.243.36:/api/cafes/${tempUser.id}/orders`,config)
        .then(res => {
            setorders(res.data)
            setloanding(false)
        }).catch(err=>{
            console.log(err)
            //window.location.href = "http://192.168.243.36:3000/auth";
        })
    }
  
    
    useEffect(() => {
        getUser()
    }, []);
  

    if(localStorage.getItem("token")===null){
        return <Navigate to='/Auth' replace={true} />;
    }
    return(
        <>            
            {loanding ? 
            <div>cargando</div>
            :
            <>
            <Header props={user}/>
            <link rel="stylesheet" href="css/order.css"></link>
            {
            !orders ?
            <h2 className="no-products">No hay Pedidos todavia</h2>
            :
            <main className="main-order">
                <section className="order">
                    {orders.map((item, index)=>
                        !item.is_completed ?
                        <OrderComponent key={index} props ={item}/>
                        :
                        <div></div>
                    )}
                </section>    
            </main>
            }
            </>
            
        }
        <Footer mode={headerMode}/>
        </>
    )
};

export default Orders;