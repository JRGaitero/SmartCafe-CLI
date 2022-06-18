import React from "react";
import { BsPencil } from "react-icons/bs";

const SettingComponentImage = (props) =>{
    const [settings] = React.useState(props.props)


    const cambiarImage = (e)=>{
        e.preventDefault()
        console.log(settings.url)
    }
    return(
        <div className="setting-component">
            <form className="form"   action="" method="POST" encType="multipart/form-data">
            <p className="input-name">Imagen</p>
                <label htmlFor='image'>
                </label>
                <input className="input-image" type='file' name='image'>
                    </input>
                <button type="button"  className="submit-pencil" onClick={cambiarImage}>
                    <BsPencil  className="pencil" ></BsPencil>
                </button>
            </form>
        </div>
    )
}
export default SettingComponentImage;