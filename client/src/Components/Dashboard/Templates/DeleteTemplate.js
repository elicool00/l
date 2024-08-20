import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import TemplateServices from "../../../services/Template";
import { useNavigate } from "react-router-dom";


function DeleteTemplate(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()

    const destroy = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {password: password}
        TemplateServices.destroy(props.id, data)
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
        navigate('/templates')
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

    return(
        <Modal {...props}>
            <Modal.Header closeButton className="bg-danger text-light">
                <Modal.Title>Confirmation!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-danger text-light">
                <ToastContainer/>
                {loader}
                <p>Woohoo, you're about to delete this template<br/>Are you sure ?</p>
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
                <button className="btn btn-outline-light" onClick={props.onHide}>
                    Close
                </button>
                <button className="btn btn-outline-light" onClick={destroy} disabled={res.loading}>
                    Confirm
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTemplate
