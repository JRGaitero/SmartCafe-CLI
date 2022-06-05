import React from "react";
import OrderComponent from "../../components/order/order";

const mockOrder = {
    id: 1,
    student_id: 1,
    amount : 4.99,
    date: '22/05/2022',
    is_completed: false,
    payment_info: ""
}

const mockOrders = []
const Orders = () =>{
    
    for(let i = 0; i<15;i++){
        mockOrders.push(mockOrder)
    }
    return(
        <>
        <main className="main-order">
        <link rel="stylesheet" href="css/order.css"></link>
            <section className="order">
                {mockOrders.map((item, index)=>
                    <OrderComponent key={index} props ={item}/>
                )}
            </section>    
        </main>
        </>
    )
};

export default Orders;