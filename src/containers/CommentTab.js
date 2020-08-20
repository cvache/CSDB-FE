import React, { useState } from 'react';
import { Image, Button, Modal, ListGroupItem, } from 'react-bootstrap';
import { API } from 'aws-amplify';
import "./CommentTab.css";
import { LinkContainer } from 'react-router-bootstrap';

function renderImage(attatchmentURL) {
    return (
        <div id="container">
            <Image id='commentImage' src={attatchmentURL}></Image>
            <div id='commentBox'>

            </div>
        </div>
    );
}

function renderCommentsList(comments) {
    console.log(comments)
    if (!comments) {
        return <h3>No comments to display</h3>
    } else {
        return [].concat(comments).map((comment, i) =>
            (
                <LinkContainer key={i} to='#'>
                    <ListGroupItem>
                        <h3>list placeholder</h3>
                    </ListGroupItem>
                </LinkContainer>
                
            )
        );
    }

    
}


export default function CommentTab(props) {
    const { image } = props;
    const { attatchmentURL, comments } = image;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    
     return (
        <>
            <div id='left'>
                { renderImage(attatchmentURL) }
            </div>
            <div id='right'>
                { renderCommentsList(comments) }
                <>
                    <Button variant='primary' onClick={handleShow}>
                        <b>{"\uFF0B"}</b> Add a comment
                    </Button>

                    <Modal 
                        show={show} 
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add a comment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Add comment tech
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary">Submit</Button>
                        </Modal.Footer>
                  </Modal>
                </>
            </div>
        </>
        
         

     )   
}