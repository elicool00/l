import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import FreebieServices from "../../../services/Freebie";
import EmailListServices from "../../../services/EmailList";


function CreateFreebie(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [lists, setLists] = useState({loading: false, data: null, error: null})
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [file, setFile] = useState(null)
    const [listId, setListId] = useState(null)
    const [tag, setTag] = useState(null)

    useEffect(() => {
        setLists({loading: true, data: null, error: null})
        EmailListServices.index()
        .then(response => {
            setLists({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setLists({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const create = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        // let data = {name: name, description: description, file: file, list_id: listId, tag: tag}
        var form = new FormData();
        form.append("name", name)
        if(description){
           form.append("description", description) 
        }
        if(tag){
            form.append("tag", tag)
        }
        form.append("file", file)
        form.append("list_id", listId)
        
        FreebieServices.store(form)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    let loader = null
    if(res.loading || lists.loading){
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

    let content
    if(lists.data){
        if(lists.data.status === 'success'){
            content = 
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <form onSubmit={create}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create new freebie
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <ToastContainer/>
                            {loader}
                            <div className="row mb-3 align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" onChange={(e) => {setName(e.target.value)}} required/>
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Compressed file</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="file" className="form-control" onChange={(e) => {setFile(e.target.files[0])}} required/>
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email list</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <select className="form-select" onChange={(e) => {setListId(e.target.value)}} required>
                                        <option selected disabled>Select list to append new emails in</option>
                                        {
                                            lists.data.message.map((list, i) => 
                                                <option key={i} value={list.id}>{list.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3 align-items-center">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Tag</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" className="form-control" placeholder="(Optional)"  onChange={(e) => {setTag(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="row mb-3 align-items-start">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Description</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <textarea className="form-control" rows={3}  placeholder="(Optional)" onChange={(e) => {setDescription(e.target.value)}} ></textarea>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                        <button type="submit" className="btn btn-outline-primary" disabled={res.loading}>Create</button>
                    </Modal.Footer>
                </form>
            </Modal>
        }
    }
    return content
}

export default CreateFreebie
