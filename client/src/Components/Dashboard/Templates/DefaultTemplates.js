import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import "../../../css/templates.css"
import TemplateServices from "../../../services/Template";
import PreviewDefault from "./PreviewDefault";
import CreateTemplate from "./CreateTemplate";


function DefaultTemplates(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [showPreview, setShowPreview] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        TemplateServices.getDefault()
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

    const HandelPreview = (view) => {
        setSelectedItem(view)
        setShowPreview(true)
    }

    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            content = res.data.message.map(template => 
                <div className="default-template" key={template.id} onClick={() => {HandelPreview(template.view)}}>
                    <img src={template.thumbnail} className="template-thumbnail"/>
                    <p className=" text-center mt-1">{template.name}</p>
                </div>
            )
        }
    }

    return (
        <>
        <div className="d-flex justify-content-between align-items-center my-2">
            <h5 className="mt-4">Default templates</h5>
            <button className="btn btn-outline-primary" onClick={() => {setShowCreate(true)}}><i className="fas fa-plus-circle mx-1"></i>Create template</button>
        </div>
        <div className="card">
            <ToastContainer/>
            {loader}
            <div className="card-body">
                <div className="default-templates-container">
                    {content}
                </div>
            </div>
            <PreviewDefault show={showPreview} onHide={() => {setShowPreview(false)}} template={selectedItem}/>
            
            {(res.data) ? (<CreateTemplate show={showCreate} onHide={() => {setShowCreate(false)}} templates={res.data.message}/>) : (null)}
        </div>
        </>
    )
}

export default DefaultTemplates
