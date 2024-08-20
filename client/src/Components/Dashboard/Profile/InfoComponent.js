import React, { useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import UserServices from "../../../services/User";
import { Modal } from "react-bootstrap";
import UpdatePassword from "./PasswordComponent";


function UserInfo(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showConfirm, setShowConfirm] = useState(false);
    const [username, setUsername] = useState(props.user.username)
    const [fullName, setFullName] = useState(props.user.full_name)
    const [password, setPassword] = useState(null)

    const update = () => {
        setRes({loading: true, data: null, error: null})
        let data = {username: username, full_name: fullName}
        UserServices.updateInfo(props.user.id, data)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })   
    }

    const destroy = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {password: password}
        UserServices.destroy(props.user.id, data)
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
        <div className="col-lg-8">
            <ToastContainer/>
            {loader}
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Username</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" value={fullName} onChange={(e) => {setFullName(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" className="form-control" value={props.user.email} disabled/>
                        </div>
                    </div>
                    <div className="row justify-content-between mx-auto">
                        <button className="btn btn-outline-danger col-md-4 col-sm-5" onClick={() => {setShowConfirm(true)}}>Delete account</button>
                        <button className="btn btn-primary col-md-4 col-sm-5 add-mt" onClick={update} disabled={res.loading}>Save Changes</button>            
                    </div>
                </div>
            </div>
            <Modal show={showConfirm} onHide={() => {setShowConfirm(false)}}>
                <form onSubmit={destroy} className="text-light">
                    <Modal.Header closeButton className="bg-danger">
                        <Modal.Title>Confirmation!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-danger">
                        <p>Woohoo, you're about to delete this account!<br/>Are you sure ?</p>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Password</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control" onChange={(e) => {setPassword(e.target.value)}} required/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-danger">
                        <button type="button" className="btn btn-outline-light" onClick={() => {setShowConfirm(false)}}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-outline-light" disabled={res.loading}>
                            Confirm
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
            <h5>Update password</h5>
            <UpdatePassword user={props.user}/>
        </div>
    )
}

export default UserInfo
