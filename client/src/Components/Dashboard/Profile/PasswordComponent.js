import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import UserServices from "../../../services/User";
import Loader from "../../Loader";


function UpdatePassword(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [currentPassword, setCurrentPasssword] = useState(null)
    const [password, setPasssword] = useState(null)
    const [passConfirm, setPassConfirm] = useState(null)

    const updatePass = () => {
        setRes({loading: true, data: null, error: null})
        let data = {current_password: currentPassword, password: password, password_confirmation: passConfirm}
        UserServices.updatePass(props.user.id, data)
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
        <div className="card mt-2">
            <ToastContainer/>
            {loader}
            <div className="card-body">
                <div className="row mb-3 align-items-center">
                    <div className="col-sm-5">
                        <h6 className="mb-0">Current Password</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                        <input type="password" className="form-control" onChange={(e) => {setCurrentPasssword(e.target.value)}}/>
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-sm-5">
                        <h6 className="mb-0">New Password</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                        <input type="password" className="form-control" onChange={(e) => {setPasssword(e.target.value)}}/>
                    </div>
                </div>
                <div className="row mb-3 align-items-center">
                    <div className="col-sm-5">
                        <h6 className="mb-0">Confirm new Password</h6>
                    </div>
                    <div className="col-sm-7 text-secondary">
                        <input type="password" className="form-control" onChange={(e) => {setPassConfirm(e.target.value)}}/>
                    </div>
                </div>
                <div class="row justify-content-end mx-auto">
                    <button className="btn btn-primary col-md-4" onClick={updatePass} disabled={res.loading}>Update password</button>               
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword
