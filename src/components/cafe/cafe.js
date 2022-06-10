import React from "react"
import {AiOutlineArrowDown, AiOutlineArrowRight} from "react-icons/ai";

const CafeComponent = (props) => {

  const [getCafe] = React.useState(props.props)

  return(
    <div className="cafe">
      <section className="section-cafe">
        <h2>{getCafe.name}</h2>
        <p>{getCafe.location}</p>
      </section>
      <section className="section-go-to">
        <a href="">
          <AiOutlineArrowRight></AiOutlineArrowRight>
        </a>
      </section>
    </div>
  )
}

export default CafeComponent