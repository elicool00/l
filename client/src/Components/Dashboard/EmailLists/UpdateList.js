import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import EmailListServices from "../../../services/EmailList";

function UpdateList(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [name, setName] = useState(props.list.name)
    const [description, setDescription] = useState(props.list.description)

    const update = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data= {name: name, description: description}
        EmailListServices.update(props.list.id, data)
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
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update email list info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={update}>
                    <ToastContainer/>
                    {loader}
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-2">
                            <h6 className="mb-0">List name *</h6>
                        </div>
                        <div className="col-sm-10 text-secondary">
                            <input type="text" className="form-control" id="list_name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                        </div>
                    </div> 
                    <div className="row mb-3 align-items-start">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Description</h6>
                        </div>
                        <div className="col-sm-10 text-secondary">
                            <textarea className="form-control" id="description" rows={5} onChange={(e) => {setDescription(e.target.value)}}>
                                {description}
                            </textarea>
                        </div>
                    </div>  
                </form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                <button className="btn btn-outline-primary" onClick={update} disabled={res.loading}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateList
