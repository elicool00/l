import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import FreebieServices from "../../../services/Freebie";
import EmailListServices from "../../../services/EmailList";


function UpdateFreebie(props){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [lists, setLists] = useState({loading: false, data: null, error: null})
    const [name, setName] = useState(props.freebie.name)
    const [description, setDescription] = useState(props.freebie.description)
    const [tag, setTag] = useState(props.freebie.tag)
    const [listId, setListId] = useState(props.freebie.list_id)
    const [file, setFile] = useState(null)

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

    const update = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        var form = new FormData();
        form.append("name", name)
        if(description){
           form.append("description", description) 
        }
        if(tag){
            form.append("tag", tag)
        }
        if(file){
            form.append("file", file)
        }
        form.append("list_id", listId)
        FreebieServices.update(props.freebie.id, form)
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

    let content = null
    if(lists.data){
        if(lists.data.status === 'success'){
            content =
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <form onSubmit={update}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update freebie - ({props.freebie.name})
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
                                <input type="text" className="form-control" defaultValue={name} onChange={(e) => {setName(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Compressed file</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="file" className="form-control" onChange={(e) => {setFile(e.target.files[0])}}/>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email list</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <select className="form-select" onChange={(e) => {setListId(e.target.value)}}>
                                    {(lists.data.message.length === 0) ? (
                                        <option disabled selected>No email list created yet!</option>
                                    ) : (
                                        <option selected value={props.freebie.list_id}>{props.freebie.list_name}</option>
                                    )}
                                    {
                                        lists.data.message.map((list, i) =>
                                            (props.freebie.list_name !== list.name) ?
                                                <option key={i} value={list.id}>{list.name}</option>
                                            : (null)
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
                                <input type="text" className="form-control" defaultValue={tag} placeholder="(Optional)"  onChange={(e) => {setTag(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-start">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Description</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <textarea className="form-control" rows={3} defaultValue={description} placeholder="(Optional)" onChange={(e) => {setDescription(e.target.value)}}></textarea>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                        <button type="submit" className="btn btn-outline-primary" disabled={res.loading}>Save changes</button>
                    </Modal.Footer>
                </form>
            </Modal>
        }
    }

    return content
}

export default UpdateFreebie
