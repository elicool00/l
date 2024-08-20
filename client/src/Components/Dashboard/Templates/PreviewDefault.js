import React from "react";
import { Modal } from "react-bootstrap";


function PreviewDefault(props){
    return(
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-dark">
                    Preview template
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div dangerouslySetInnerHTML={{ __html: props.template }} id="preview"/>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default PreviewDefault