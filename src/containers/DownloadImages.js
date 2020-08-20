import React, { useState, useEffect } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem, PageHeader, ListGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./DownloadImages.css";
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';


export default function DownloadImages() {
    const [images, setImages] = useState([]);
    const {isAuthenticated} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if(!isAuthenticated) {
                return;
            }

            try {
                const images = await loadImages();
                setImages(images);
            } catch (e) {
                onError(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadImages() {
        return API.get("notes", "/images")
    }

    function renderPhotosList(images) {
        return [{}].concat(images).map((image, i) => 
            i !== 0 ? (
                <LinkContainer key={image.imgId} to={`/image/${image.imgId}`}>
                    <ListGroupItem header={image.title}>
                        {"Created: " + new Date(image.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key='new' to="/image/upload">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Upload a new Image
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
            )
        );
    }

    function renderPhotos() {
        return (
            <div className='photos'>
                <PageHeader>Images</PageHeader>
                <ListGroup>
                    {!isLoading && renderPhotosList(images)}
                </ListGroup>

            </div>
        )
    }
    
    
    return (
        <div className="home">
            {renderPhotos()}
        </div>
    );
}