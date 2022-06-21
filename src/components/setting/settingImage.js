import React from "react";
import { BsPencil } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const SettingComponentImage = (props) =>{
    const [settings] = React.useState(props.props)
    const [user, setUser] = useState();

    const getUser = async ()=>{
        let config = {
            headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }
        await axios.get(`http://192.168.243.36:/api/profile`,config)
        .then(res => { 
            setUser(res.data[0])
        }).catch(err=>{
            alert("Sesion Caducada")
            window.location.href = "http://192.168.243.36:3000/auth";
        });
    }
    useEffect(() => {
        getUser()
    }, [console.log()]);


    const cambiarImage = (e)=>{
        e.preventDefault()
        const changedUser = {}
            const new_profile_pic=document.querySelector('#image').files[0] 
            changedUser.profile_pic =  new_profile_pic
            changedUser._method = "PUT"
            axios({
                method: "POST",
                url: "http://192.168.243.36/api/users/"+user.user_id,
                data: changedUser,
                headers: { "Content-Type": "multipart/form-data" , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
              }).then(res=>{
                window.location.href = "http://192.168.243.36:3000/settings";
            }).catch((err)=>{
                console.log(err)
            })
    }
    return(
        <div className="setting-component">
            <form className="form"   action="" method="POST" encType="multipart/form-data">
            <p className="input-name">Imagen</p>
                <label htmlFor='image'>
                </label>
                <input className="input-image" type='file' name='image' id="image">
                    </input>
                <button type="button"  className="submit-pencil" onClick={cambiarImage}>
                    <BsPencil  className="pencil" ></BsPencil>
                </button>
            </form>
        </div>
    )
}
export default SettingComponentImage;