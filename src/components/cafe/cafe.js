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
      setShow(false)
      return
    }
    e.preventDefault()
    let config = {
      headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
  }
  console.log(getCafe.id)
    axios.get(`http://localhost:/api/cafes/${getCafe.id}/products`,config)
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
        <h2>{getCafe.name}</h2>
        <p>{getCafe.location}</p>
      </section>
      <section className="section-go-to">
        
        { 
        show 
        ?
        products.map((item,index)=>{
                    return <ProductComponent key={index} props ={item} ></ProductComponent>
                })
                :
                <div></div>

          }
          <a onClick={showProducts} >
          <AiOutlineArrowRight></AiOutlineArrowRight>
        </a>
      </section>
    </div>
    </>
  )
}

export default CafeComponent;