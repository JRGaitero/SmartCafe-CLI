import React from "react";

const NewProduct = () =>{

    return (
        <div className="div-product-from">
            <form  className="product-from" action="http://localhost/api/products" method="POST" encType="multipart/form-data">
                <label className="" for="cafe-id">
                    <input id="cafe-id" name="cafe-id" value="1" hidden='true'>

                    </input>
                </label>
                <label for="name">
                    <input type='text' id="name" name="name">

                    </input>    
                </label>
                    <input type='number' id="price" name="price" >

                    </input>
                <label>
                    <input type='text' id="description" name="description">

                    </input>
                </label>
                <label>
                    <input type="text" id="category" name="category" >

                    </input>
                </label>
                <label>
                    <input type='file' id="image" name="image" value="img/default-imge.jpg" >

                    </input>
                </label>
            
            </form>
        </div>
    )

}

export default NewProduct;