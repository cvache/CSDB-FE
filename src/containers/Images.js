import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Image } from 'react-bootstrap';
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import './Images.css';


export default function Images() {
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");

    console.log("id: " + id)
    useEffect(() => {
        console.log('useEffect flag')
        
        function loadImage() {
            return API.get("notes", `/images/${id}`);
        }

        async function onLoad() {
            try {
                const image = await loadImage();
                const {title, imgName} = image;
                
                
                image.attatchmentURL = await Storage.get(imgName, { level: 'protected' });
                

                setTitle(title);
                setImage(image);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);
    

    console.log("image: " + image);
    if (image != null){
        console.log(image.attatchmentURL);
    }

    console.log("rendered")
    return (
        <div className='ImgSection'>
            <h2>{title}</h2>
            <Tabs defaultActiveKey='Image' id='infoTabs'>
                <Tab eventKey='Image' title='Image'>
                    <Image src={image ? image.attatchmentURL : '#'}></Image>
                </Tab>
                
                <Tab eventKey='tags' title='Tags'>
                    <h2>Map to table</h2>
                </Tab>
            </Tabs>
        </div>
    );
}