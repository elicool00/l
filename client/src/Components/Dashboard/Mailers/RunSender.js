import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import MailerServices from "../../../services/Mailer";
import { useNavigate } from "react-router-dom";

function RunSender(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const navigate = useNavigate()

    const send = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        MailerServices.run(props.id)
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

    return(
        <Modal {...props}>
            <Modal.Header closeButton className="bg-primary text-light">
                <Modal.Title>Confirmation!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ToastContainer/>
                {loader}
                You're about to run a mailer and send emails<br/>Are you sure ?
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-primary" onClick={props.onHide}>
                    Close
                </button>
                <button className="btn btn-primary" onClick={send} disabled={res.loading}>
                    Confirm
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default RunSender
