import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import {BsCart4, BsTrashFill} from "react-icons/bs";

const ProductComponent = (props) =>{
    const [product] = React.useState(props.props)
    const [mode] = React.useState(props.mode)

    const deleteFromCart = (e) => {
        e.preventDefault()
        const indexToRemove = JSON.parse(localStorage.getItem('cart'))
          .findIndex(product => product.id === props.props.id)
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.splice(indexToRemove, 1)
        if (cart.length === 0) {
            localStorage.removeItem('cart')
        } else {
            localStorage.setItem('cart',
              JSON.stringify(cart))
        }
        window.dispatchEvent( new Event('storage') )
    }

    const addToCart = (e) => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', '[]')
        }
        e.preventDefault()
        localStorage.setItem('cart',
          JSON.stringify(JSON.parse(localStorage.getItem('cart')).concat(product)))
    }

    const showProducts = (e) =>{
        //Metodo para desplegar el producto y asi ver mas informacion de este
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
                <p>Descripcion: ${product.description}</p></section>`

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
                    <AiOutlineArrowDown/>
                </a>
                {
                    mode !== null && <div>
                      {
                          mode === 'delete' ?
                              <a href="" onClick={deleteFromCart}>
                                  <BsTrashFill/>
                              </a> :
                              <a href="" onClick={addToCart}>
                                  <BsCart4/>
                              </a>

                      }
                  </div>
                }
            </section>
        </div>)
}

export default ProductComponent;
