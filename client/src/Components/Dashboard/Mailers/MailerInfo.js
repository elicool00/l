import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import MailerServices from "../../../services/Mailer";
import { Link } from "react-router-dom";
import UpdateMailer from "./UpdateMailer";
import DeleteMailer from "./DeleteMailer";


function MailerInfo(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showUpdate, seShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        MailerServices.show(props.id)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(res.loading){
        loader = <div className="loader_mid"><Loader/></div>
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
    }
    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            content = 
            <>
                <ToastContainer/>
                {loader}
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{res.data.message.name}</h1>
                    <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-outline-warning mx-2" onClick={() => {seShowUpdate(true)}}><i className="fas fa-pen"></i></button>
                        <button className="btn btn-outline-danger" onClick={() => {setShowDelete(true)}}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
                <div className="mt-4 col-md-10">
                    {(res.data.message.frequency === "once") ? (
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Last time sent:  </h6>
                            </div>
                            <div className="col-sm-9 text-muted">
                                {(res.data.message.sent_at) ? (res.data.message.sent_at) : ("Not sent yet!")}
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Status:  </h6>
                            </div>
                            <div className="col-sm-9">
                                {(res.data.message.status === "running") ? (
                                    <span className="text-success text-capitalize">{res.data.message.status}</span>
                                ): (
                                    <span className="text-danger text-capitalize">{res.data.message.status}</span> 
                                )}
                            </div>
                        </div>
                    )}
                    
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email subject:</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            {res.data.message.subject}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Reply email:</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            {res.data.message.reply_email}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Sending frequency:</h6>
                        </div>
                        <div className="col-sm-9 text-muted text-capitalize">
                            {res.data.message.frequency.replace("_", " ")}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email list:</h6>
                        </div>
                        <div className="col-sm-9 text-muted text-capitalize">
                            <Link to={`/email-lists/${res.data.message.list_id}`} className="link-muted">{res.data.message.list_name}</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Template:</h6>
                        </div>
                        <div className="col-sm-9 text-muted text-capitalize">
                            <Link to={`/templates/${res.data.message.template_id}`} className="link-muted">{res.data.message.template_name}</Link>
                        </div>
                    </div>
                    <hr/>
                </div>
                <UpdateMailer show={showUpdate} onHide={() => {seShowUpdate(false)}} mailer={res.data.message}/>
                <DeleteMailer show={showDelete} onHide={() => {setShowDelete(false)}} id={res.data.message.id}/> 
            </>
        }
    }

    return content
}

export default MailerInfo
