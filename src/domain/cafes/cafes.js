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
  const [user, setUser] = useState();
  const [headerMode] = useState('student')
  let tempUser = {}

  const getUser = async ()=>{
      let config = {
          headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
          }
      }
      await axios.get(`http://192.168.243.36:/api/profile`,config)
      .then(res => {
        if (res.data[0].user.role !== 'student') {
          window.location.href="http://192.168.243.36:3000/products"
        }
          setUser(res.data[0])
          tempUser = res.data[0]
          getCafes()

      }).catch(err=>{
          console.log(err)
          alert("Sesion Caducada")
          window.location.href = "http://192.168.243.36:3000/auth";
      });
  }
  const getCafes = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    await axios.get('http://192.168.243.36/api/cafes', config)
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
    getUser()
  }, [console.log(cafes)])
  if(localStorage.getItem("token")===null){
    return <Navigate to='/Auth' replace={true} />;
  }

  return(
    <>
   
      {
        loading ?
          <div>cargando</div>
          :            
          <>
          <Header  props={user}/>
          <main className="main-cafe">
            <link rel="stylesheet" href="css/cafe-products.css"/>
            <link rel="stylesheet" href="css/product.css"></link>

            <section className="cafes">
              {
                cafes.map((item, index) => <CafeComponent key={index} props={item} mode={productMode}/>)
              }
            </section>
          </main>
          </>
      }
      <Footer mode={headerMode} />
    </>
  )

};

export default Cafes;