import React from "react"
import {AiOutlineArrowDown, AiOutlineArrowRight} from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import ProductComponent from "../../components/product/product";

const CafeComponent = (props) => {

  const [getCafe] = React.useState(props.props)
  const [show,setShow] = React.useState(false)
  const [products, setProducts] = useState({});

  const showProducts = (e)=>{

    if(show){
      const arrow = document.querySelector("#arrow-cafes")
      arrow.className = "section-go-to" 
      setShow(false)
      return
    }
    e.preventDefault()
    const arrow = document.querySelector("#arrow-cafes")
    arrow.className = "section-go-to-2" 
    let config = {
      headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
  }
  console.log(getCafe.id)
    axios.get(`http://192.168.243.36:/api/cafes/${getCafe.id}/products`,config)
    .then(res => {
        console.log(res)
        setProducts(res.data)
        setShow(true)


    });
  }


  return(
    <>
      <link rel="stylesheet" href="css/cafe-product.css"></link>
    <div className="cafe">
      <section className="section-cafe">
        <h2>Cafeteria: {getCafe.name}</h2>
        <p>Ubicacion: {getCafe.location}</p>
      </section>
      <section>
        
        { 
        show 
        ?
        products.map((item,index)=>{
                    return <ProductComponent key={index} props ={item} ></ProductComponent>
                })
                :
                <div></div>

          }
          <a  className="section-go-to" id="arrow-cafes" onClick={showProducts} >
          <AiOutlineArrowRight></AiOutlineArrowRight>
        </a>
      </section>
    </div>
    </>
  )
}

export default CafeComponent;