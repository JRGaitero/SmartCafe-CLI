import React from "react"
import { AiOutlineArrowDown } from "react-icons/ai";
import axios from "axios";

 
 const OrderComponent = (props) =>{
    
    const [getOrder] = React.useState(props.props)


    const getHtmlProducts = (products) => {

        //Metodo para obtener el desplegable de pedidos este muestra una lista de todos los productos de forma unica y un conteno de cuantos de cada

        let html = "<section class='products'>"
        let uniqueProducts = []

        products.forEach(function(product){
            if (uniqueProducts[product.name]===undefined){
                uniqueProducts[product.name] = 1
            }
            else{
                uniqueProducts[product.name] = uniqueProducts[product.name] +1
            }
        });
        console.log(uniqueProducts)
        for(var product in uniqueProducts){
        
            html+=`<div class ='section-products'><p class='product-name'>${product}</p><p class='product-units'>${uniqueProducts[product]}</div>`
        }
        html+="</section>"
        return html
    }

    const confirmProduct = (e) =>{
        //Metodo para confirmar un producto para saber que ya se ha realizado
        e.preventDefault()
        const father = e.target.parentNode.parentNode.parentNode
        const child = e.target.parentNode.parentNode
        console.log("hola")

        if(father.querySelector('#product-eliminated')==undefined){
            father.insertAdjacentHTML(
                "afterBegin",
                "<div id='product-eliminated' class='product-eliminated'>Pedido Confirmado</div>"
            )
            function clear() {
                setTimeout(clearRedBox, 2000);
            }
            const productEiminated = father.querySelector('#product-eliminated')
            
            clear()
            function clearRedBox() {
                father.removeChild(productEiminated)
            }
            const changeOrder = {
                is_completed:1
            }
            axios({
                method: "PUT",
                url: "http://192.168.243.36/api/orders/"+getOrder.id,
                data: changeOrder,
                headers: { "Content-Type": "application/json" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                window.location.href = "http://192.168.243.36:3000/orders";
            }).catch((err)=>{
                console.log(err)
            })
        }
        
        father.removeChild(child)
    } 
    const showProducts = (e) =>{
        //Metodo para desplegar los productos de los pedidos
        e.stopPropagation()
        e.preventDefault()
       
        if (e.target.parentNode.parentNode.className!=='section-order-products'){
            return
        }
        const order = e.target.parentNode.parentNode
        if (order.parentNode.querySelector(".products")){
        
            const div = order.parentNode
            const section = div.querySelector(".products")
            div.removeChild(section)
            e.target.parentNode.className = 'arrow'
        }else{
            const products =getOrder["product"]
            const  html = getHtmlProducts(products)
            order.insertAdjacentHTML(
                "beforeBegin",
                html
            )
        
            e.target.parentNode.className = 'arrow-reverse'
        }
        e.stopPropagation();

    

    }


    return(
        <div  className="order-product" >
            <section className="section-order">
                <h2>Pedido nº{getOrder.id}</h2>
                <p className="order-amount">{getOrder.amount} €</p>
            </section>
            <section className="section-order-products">
                <a href="" onClick={showProducts} className="arrow">               
                    <AiOutlineArrowDown></AiOutlineArrowDown>
                </a>
                <a  href=""  className="confirm-product" onClick={confirmProduct}>Confirmar Pedido</a>
            </section>
        </div>)
 }

 export default OrderComponent