import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import FreebieServices from "../../../services/Freebie";
import { Link, useNavigate } from "react-router-dom";
import UpdateFreebie from "./UpdateFreebie";
import DeleteFreebie from "./DeleteFreebie";


function FreebieDetails(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        FreebieServices.show(props.id)
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
        navigate("/freebies")
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
                        <button className="btn btn-outline-warning mx-2" onClick={() => {setShowUpdate(true)}}><i className="fas fa-pen"></i></button>
                        <button className="btn btn-outline-danger" onClick={() => {setShowDelete(true)}}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
                <div className="mt-4 col-md-10">
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Name</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            {res.data.message.name}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Description</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            {(res.data.message.description != null) ? (res.data.message.description) : ("No description")}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Freebie URL</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            <Link to={`/freebies/${res.data.message.id}/download`} target="_blank">{window.location.href + `/download`}</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Email list</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            <Link to={`/email-lists/${res.data.message.list_id}`}>{res.data.message.list_name}</Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="mb-0">Tag</h6>
                        </div>
                        <div className="col-sm-9 text-muted">
                            {(res.data.message.tag) ? (res.data.message.tag) : ("No tag specified")}
                        </div>
                    </div>
                    <hr/>
                </div>
                <UpdateFreebie show={showUpdate} onHide={() => {setShowUpdate(false)}} freebie={res.data.message}/>
                <DeleteFreebie show={showDelete} onHide={() => {setShowDelete(false)}} id={res.data.message.id}/>
            </>
        }
    }

    return content
}

export default FreebieDetails
