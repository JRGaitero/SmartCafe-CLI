import React from "react"
import { AiOutlineArrowDown } from "react-icons/ai";

 
 const OrderComponent = (props) =>{
    
    const [getOrder] = React.useState(props.props)

    const getHtmlProducts = (products) => {

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
        }
        
        father.removeChild(child)
    } 
    const showProducts = (e) =>{
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