import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import Header from "../../components/header/header";
import CafeComponent from "../../components/cafe/cafe";
import Footer from "../../components/footer/footer";

const Cafes = () => {

  const [cafes, setCafes] = useState({})
  const [loading, setLoading] = useState(true)
  const [productMode] = useState('add')

  const getCafes = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    await axios.get('http://localhost/api/cafes', config)
      .then(res => {
        setCafes(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('token')
        return <Navigate to='/Auth' replace={true} />
      })
  }

  useEffect(() => {
    getCafes()
  }, [console.log(cafes)])
  if(localStorage.getItem("token")===null){
    return <Navigate to='/Auth' replace={true} />;
  }

  return(
    <>
      <Header />
      {
        loading ?
          <div>cargando</div>
          :
          <main className="main-cafe">
            <link rel="stylesheet" href="css/cafe-products.css"/>
            <link rel="stylesheet" href="css/product.css"></link>

            <section className="cafes">
              {
                cafes.map((item, index) => <CafeComponent key={index} props={item} mode={productMode}/>)
              }
            </section>
          </main>
      }
      <Footer/>
    </>
  )

};

export default Cafes;