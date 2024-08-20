import React, { useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import UserServices from "../../../services/User";


function Avatar (props){
    const [selectedFile, setSelectedFile] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        document.getElementById('profile-pic').src = URL.createObjectURL(event.target.files[0]);
	};

    const setAvatar = () => {
        setRes({loading: true, data: null, error: null})
        var form = new FormData();
        form.append("profile_picture", selectedFile)
        UserServices.setAvatar(props.user.id, form)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    const deleteAvatar = () => {
        setRes({loading: true, data: null, error: null})
        UserServices.deleteAvatar(props.user.id)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    let loader = null
    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }
    if(res.data){
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        window.location.reload()
    }

    if(res.error){
        if(res.error.status === "fail"){
            toast.error(res.error.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        if(res.error.status === "fail-arr"){
            for (const [key, value] of Object.entries(res.error.message)) {
                toast.error(value[0], {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
            }
        }
        setRes({loading: false, data: null, error: null})
    }

    return (
        <div className="col-lg-4">
            <ToastContainer/>
            {loader}
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                        <img id="profile-pic" src={props.user.profile_picture} alt="AVATAR" className="rounded-circle p-1 bg-primary" width="110"/>
                        <div className="mt-3">
                            <h4>{props.user.username}</h4>
                            <p className="text-secondary mb-1">{props.user.full_name}</p>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <div className="row d-flex justify-content-between col-12 mt-3 mx-auto">
                        <label htmlFor="select_avatar" className={(res.loading) ? ("btn btn-primary col-6 disabled") : ("btn btn-primary col-6")}>Select image</label>
                        <input type="file" id="select_avatar" onChange={changeHandler} hidden/>
                        <button className="btn btn-outline-primary col-4" onClick={setAvatar} disabled={res.loading}>Save</button>
                    </div>
                    <button className="btn btn-outline-danger mt-2 col-12 mx-auto" onClick={deleteAvatar} disabled={res.loading}>Delete Profile picture</button>
                </div>
            </div>
        </div>
    )
}

export default Avatar
