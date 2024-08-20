import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import TemplateServices from "../../../services/Template";
import { useNavigate } from "react-router-dom";


function CreateTemplate(props){
    const [name, setName] = useState(null)
    const [defaultId, setDefaultId] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const navigate = useNavigate()

    const create = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {name: name, default_id: defaultId}
        TemplateServices.create(data)
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
    if(res.data){
        if(res.data.status === 'success'){
            toast.success(res.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setRes({loading: false, data: null, error: null})
        // window.location.reload()
        navigate(`/templates/${res.data.id}/`)
    }


    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create template
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={create}>
                    <ToastContainer/>
                    {loader}
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <h6 className="mb-0">Name</h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                            <input type="text" className="form-control" placeholder="(Optional)" id="temp_name" onChange={(e) => {setName(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-4">
                            <h6 className="mb-0">Default template</h6>
                        </div>
                        <div className="col-sm-8 text-secondary">
                            <select className="form-select" onChange={(e) => {setDefaultId(e.target.value)}}>
                                <option selected disabled>Select default template to customize</option>
                                {
                                    props.templates.map(template => 
                                        <option key={template.id} value={template.id}>{template.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                <button className="btn btn-outline-primary" onClick={create} disabled={res.loading}>Create</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTemplate
