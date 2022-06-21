import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {Navigate} from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import ProductComponent from "../../components/product/product";

const CafeProducts = (props) => {
  const [cafeProducts, setCafeProducts] = useState({})
  const [loading, setLoading] = useState(true)

  const getCafeProducts = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    await axios.get(`http://192.168.243.36/api/cafes/${props.props.id}/products`, config)
      .then(res => {
        setCafeProducts(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        return <Navigate to='/Auth' replace={true} />
      })
  }

  useEffect(() => {
    getCafeProducts()
  }, [console.log(cafeProducts)])

  if(localStorage.getItem("token")===null){
    return <Navigate to='/Auth' replace={true} />;
  }

  return (
    <>
      <Header />
      {
        loading ?
          <div>cargando</div>
          :
          <main className="main-cafeProduct">
            <section className="product">
              {
                cafeProducts.map((item,index)=>{
                  return <ProductComponent key={index} props ={item} />
                })
              }
            </section>
          </main>
      }
      <Footer />
    </>
  )
}

export default CafeProducts