import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Dashboard/Navbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "../../css/dashboard.css"
import Loader from "../../Components/Loader";
import TemplateServices from "../../services/Template";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import DeleteTemplate from "../../Components/Dashboard/Templates/DeleteTemplate";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


function TemplateById(){
    const [res, setRes] = useState({loading: false, data: null, error: null})
    const [updateRes, setUpdateRes] = useState({loading: false, data: null, error: null})
    const [showSide, setShowSide] = useState(true)
    const [showDelete, setShowDelete] = useState(false)
    const [selectedId, setSelectedId] = useState(false)
    const [html, setHtml] = useState("")
    const [name, setName] = useState(null)
    const [assetsView, setAssetsView] = useState([])
    const [assets, setAssets] = useState([])
    const [headers, setHeaders] = useState([])
    const [links, setLinks] = useState([])
    const [textMatches, setTextMatches] = useState([])
    const [linkMatches, setLinkMatches] = useState([])
    const { id } = useParams()

    useEffect(() => {
        setRes({loading: true, data: null, error: null})
        TemplateServices.show(id)
        .then(response => {
            setRes({loading: false, data: response.data, error: null})
            setHtml(response.data.html)
            setName(response.data.message.name)
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }, [])

    const update = () => {
        setUpdateRes({loading: true, data: null, error: null})
        var form = new FormData();
        assets.map((item, i) => {
            if(item){
                form.append("assets[]", item)
                form.append("assets_c[]", i + 1)
            }
        })
        form.append("view", html)
        form.append("name", name)
        form.append("textChanges", JSON.stringify(textMatches))
        form.append("linkChanges", JSON.stringify(linkMatches))
        TemplateServices.update(id, form)
        .then(response => {
            setUpdateRes({loading: false, data: response.data, error: null})
        })
        .catch(error => {
            setRes({loading: false, data: null, error: error.response.data})
        })
    }

    let loader = null
    if(res.loading || updateRes.loading){
        loader = <div className="loader_mid"><Loader/></div>
    }

    if(updateRes.data){
        if(updateRes.data.status === 'success'){
            toast.success(updateRes.data.message, {position: "top-right", autoClose: 5000, hideProgressBar: true, theme: "colored"});
        }
        setUpdateRes({loading: false, data: null, error: null})
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
    }

    const AssetsChangeHandler = (e) => {
        let temp = assets
        temp[e.target.id] = e.target.files[0]
        setAssets(temp)        
    }

    const CheckAssets = () => {
        //Check asssets
        var matches = (html.match(/<img/g) || []);
        setAssets(Array.apply(null, Array(matches.length)))
        var assets_view = matches.map((a, i) => 
            <div className="d-flex align-items-center justify-content-center my-2" key={i + 1}>
                <label className="w-50">Choose asset number {i + 1} </label>
                <input type="file" className="form-control w-50" onChange={AssetsChangeHandler} name="assets[]" id={i}/>
            </div>
        )
        setAssetsView(assets_view)
    }

    const HandelOnChange = (e) => {
        setHtml(e.target.value)
        CheckAssets()
        CheckText()
    }

    const HandelShowDelete = (id) => {
        setSelectedId(id)
        setShowDelete(true)
    }

    const CheckText = () => {
        //links
        var re_a = new RegExp('<a[^>]+href=\"(.*?)\"[^>]*>(.*?)<\/a>', "g");
        var matches_a = html.matchAll(re_a);
        var res_a = []
        var temp = []
        for (var result of matches_a) {
            delete result.input
            delete result.groups
            result.push(result.index)
            result.push(result[0])
            result.push(result[2])
            delete result.index
            res_a.push(result)
            temp.push(result[1])
            temp.push(result[2])
        }
        //text
        var re = new RegExp('(?<=\>)(?!<)(.*)(?=\<)(?<!\>)', "g");
        var matches = html.matchAll(re);
        var res_t = []
        
        for (var result of matches) {
            if(!temp.includes(result[1])){
                delete result.input
                delete result.groups
                result.push(result.index)
                delete result.index
                res_t.push(result)
            }
        }
        
        setLinkMatches(res_a)
        setTextMatches(res_t)
        var view = res_t.map((a, i) => 
            <div className="d-flex justify-content-around my-1" key={i + 1}>
                <input type="text" className="form-control" data-index={a.index} data-previous={a[1]} defaultValue={a[1]} onChange={(e) => {HandelTextChange(e, a, i, res_t)}}/>
            </div>
        )
        var view_a = res_a.map((a, i) =>
            <div className="d-flex justify-content-around my-1" key={i + 1}>
                <div>
                    <label className="label">Link text</label>
                    <input type="text" className="form-control" defaultValue={a[2]} onChange={(e) => {HandelLinkText(e, a, i, res_a)}}/> 
                </div>
                <div>
                    <label className="label">Link URL</label>
                    <input type="text" className="form-control" defaultValue={a[1]} onChange={(e) => {HandelLinkURL(e, a, i, res_a)}}/> 
                </div>
            </div>
        )
        setHeaders(view)
        setLinks(view_a)
    }

    const HandelTextChange = (e, match, i, matches) => {
        var previousVal = match[0]
        var currentVal = e.target.value
        matches[i][1] = currentVal
        setTextMatches(matches)
    }

    const HandelLinkURL = (e, match, i, matches) => {
        var currentVal = e.target.value
        var prevLink = `href="${matches[i][1]}"`
        var currLink = `href="${currentVal}"`
        matches[i][0] = matches[i][0].replace(prevLink, currLink)
        matches[i][1] = currentVal
        setLinkMatches(matches)
        
    }

    const HandelLinkText = (e, match, i, matches) => {
        var currentVal = e.target.value
        matches[i][2] = currentVal
        setLinkMatches(matches)
    }

    const HandelOnload = () => {
        CheckAssets()
        CheckText()
    }
    let content = null
    if(res.data){
        if(res.data.status === 'success' && html){
            content =
            <div id="wrapper" className={(showSide) ? ("wrapper-content") : ("wrapper-content toggled")} onLoad={() => {HandelOnload()}}>
                <Sidebar active="Templates"/>
                <Navbar showSide={showSide} setShowSide={setShowSide}/>
                <div id="page-content-wrapper">    
                    <ToastContainer/>
                    {loader}           
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="text-dark">My templates - {res.data.message.name}</h1>
                                    <button className="btn btn-outline-danger" onClick={() => {HandelShowDelete(res.data.message.id)}}><i className="fas fa-trash mx-1"></i>Delete template</button>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <Tabs defaultActiveKey="preview" className="mb-3">
                                            <Tab eventKey="preview" title="Preview" className="preview-container">
                                                {/* <div dangerouslySetInnerHTML={{ __html: html }} id="preview"/> */}
                                                { ReactHtmlParser(html) }
                                            </Tab>
                                            <Tab eventKey="assets" title="Assets / images">
                                                <h5>{assetsView.length} assets found in view</h5>
                                                <div className="mt-3">
                                                    {assetsView}
                                                </div>
                                            </Tab>
                                            <Tab eventKey="text" title="Text / links">
                                                <h4>Text</h4>
                                                {headers}
                                                <h4>Links</h4>
                                                {links}
                                            </Tab>
                                            <Tab eventKey="code" title="Code">
                                                <input type="text" className="form-control mb-3" value={name} id="temp_name" onChange={(e) => {setName(e.target.value)}}/>
                                                <textarea className="form-control" id="html" rows={20} value={html} onChange={HandelOnChange}></textarea>
                                            </Tab>
                                        </Tabs>                                       
                                    </div>
                                    <div className="card-footer d-flex justify-content-end py-3">
                                        <button className="btn btn-outline-primary" onClick={update} disabled={updateRes.loading}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteTemplate show={showDelete} onHide={() => {setShowDelete(false)}} id={selectedId}/>
            </div>
        }
    }
    return content
}

export default TemplateById
