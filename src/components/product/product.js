import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

const ProductComponent = (props) =>{
    const [product] = React.useState(props.props)

    const showProducts = (e) =>{
        e.stopPropagation()
        e.preventDefault()
        if (e.target.parentNode.parentNode.className!=='section-products-decription'){
            return
        }
        const order = e.target.parentNode.parentNode

        if (order.parentNode.querySelector(".product-description")){
            
            console.log(true)
            const div = order.parentNode
            console.log(div)
            const section = div.querySelector(".product-description")
            div.removeChild(section)
            e.target.parentNode.className = 'arrow'
        }else{
            
            order.insertAdjacentHTML(
                "beforeBegin",
                `<section class='product-description'><p>Categoria: ${product.category}<p>
                <p>Descripcion: ${product.description}</p><img class='product-image' src=${product.image}></img></section>`

            )
        
            e.target.parentNode.className = 'arrow-reverse'
        }
        e.stopPropagation();
    
       
    
    }

    return(
        <div  className="product-product" >
            <section className="section-product">
                <h2 className="product-name">Producto {product.name}</h2>
                <p className="product-price">Precio: {product.price} €</p>
            </section>
            <section className="section-products-decription">
                <a href="" onClick={showProducts} className="arrow">               
                    <AiOutlineArrowDown></AiOutlineArrowDown>
                </a>
            </section>
        </div>)
}

export default ProductComponent;
