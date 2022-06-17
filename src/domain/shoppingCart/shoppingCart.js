import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProductComponent from "../../components/product/product";
import axios from "axios";

const ShoppingCart = () => {

  const [cart, setCart] = useState([])

  const [productMode] = useState('delete')

  const getCart = () => {
    setCart(JSON.parse(localStorage.getItem('cart')))
  }

  const createOrder = (e) => {
    e.preventDefault()

    let productIds = ''
    let amount = 0

    axios({
      method: 'get',
      url: 'http://localhost/api/profile',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")},
    }).then( res => {
      JSON.parse(localStorage.getItem('cart')).forEach( product => {
        productIds = productIds.concat(product.id)
        amount += product.price
      })

      let bodyFormData = new FormData()
      bodyFormData.append('amount', amount)
      bodyFormData.append('date', new Date().toISOString().split('T')[0])
      bodyFormData.append('is_completed', 0)
      bodyFormData.append('student_id', res.data[0].id)
      bodyFormData.append('products_ids', productIds)

      axios({
        method: 'post',
        url: 'http://localhost/api/orders',
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem("token")}
      }).then( res => {
        localStorage.removeItem('cart')
        window.location.href = "http://localhost:3000/cafes"
      })
    })




  }

  useEffect(() => {
    window.addEventListener('storage', () => {
      getCart()
    })
    getCart()

  }, [])

  return (
    <>
      <Header/>
      {
        localStorage.getItem('cart') ?
          <main className="main-shoppingCart">
            <section className="products">
              {
                cart.map((item, index) => {
                  return <ProductComponent key={index} props={item} mode={productMode}/>
                })
              }
            </section>
            <button onClick={createOrder}>Completar pedido</button>
          </main>
          :
          <div>No tienes productos en el carrito</div>
      }
      <Footer/>

    </>
  )
}

export default ShoppingCart