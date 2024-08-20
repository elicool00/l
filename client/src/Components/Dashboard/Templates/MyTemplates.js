import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { toast, ToastContainer } from "react-toastify";
import "../../../css/templates.css"
import TemplateServices from "../../../services/Template";
import { Link } from "react-router-dom";


function MyTemplates(){
    const [res, setRes] = useState({loading: false, data: null, error: null})

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        TemplateServices.index()
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    let loader = null
    if(res.loading){
        loader = loader = <div className="loader_mid"><Loader/></div>
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
    let cart = null
    let content = null
    if(res.data){
        if(res.data.status === 'success'){
            if(res.data.message.length === 0){
                cart = <p className="my-2 text-muted">Empty...</p>
            }else{
                content = res.data.message.map(template => 
                    <div className="default-template" key={template.id}>
                        <Link to={`/templates/${template.id}`}>
                            <img src={template.thumbnail} className="template-thumbnail"/>
                            <p className="text-center mt-1">{template.name}</p>
                        </Link>
                    </div>
                )
                cart = 
                <div className="card">
                    <ToastContainer/>
                    {loader}
                    <div className="card-body">
                        <div className="default-templates-container">
                            {content}
                        </div>
                    </div>
                </div>
            }            
        }
    }

    return cart
}

export default MyTemplates
