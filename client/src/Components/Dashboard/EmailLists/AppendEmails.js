import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import EmailListServices from "../../../services/EmailList";
import "../../../css/tags.css"


function AppendEmail(props){
    const [emails, setEmails] = useState([])
    const [tag, setTag] = useState(null)
    const [res, setRes] = useState({loading: false, data: null, error: null})

    const handleKeyUp = (e) => {
        var current = e.target.value
        setEmails([])
        var arr = current.split(' ');
        arr.forEach(function(a){
            if(a != ""){
                setEmails(emails => [...emails, a])
            }
        })
    }
    const removeTag = (email, index) => {
        setEmails(emails.filter((el, i) => i !== index))
        document.getElementById("emails").value = document.getElementById("emails").value.replace(email, "")
    }

    const append = (e) => {
        e.preventDefault()
        setRes({loading: true, data: null, error: null})
        let data = {email: emails, tag: tag}
        EmailListServices.appendEmails(props.list.id, data)
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
                    Append Emails to {props.list.name} <span className="small-text text-muted">Separate emails with space</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={append}>
                    <ToastContainer/>
                    {loader}
                    <div className="row mb-3 align-items-center">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Tag</h6>
                        </div>
                        <div className="col-sm-10 text-secondary">
                            <input type="text" className="form-control" id="tag" placeholder="(Optional)" onChange={(e) => {setTag(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-start">
                        <div className="col-sm-2">
                            <h6 className="mb-0">Emails</h6>
                        </div>
                        <div className="col-sm-10 text-secondary">
                            <textarea onChange={handleKeyUp} className="form-control" placeholder="Enter emails with space delimiter" id="emails" rows={15}></textarea>
                            <div className="tags-input-container">
                            {
                                emails.map((email, index) =>
                                    <div className="tag-item" key={index}>
                                        <span className="text">{email}</span>
                                        <span className="close" onClick={() => removeTag(email, index)}>&times;</span>
                                    </div>
                                ) 
                            }
                            </div>
                        </div>
                    </div> 
                </form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
                <button className="btn btn-outline-primary" onClick={append} disabled={res.loading}>Add</button>
            </Modal.Footer>
        </Modal>
    )
}

export default AppendEmail
