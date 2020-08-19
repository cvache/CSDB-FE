import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Image } from 'react-bootstrap';
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import TagTable from "../components/TagTable";
import MetadataTable from "../components/MetadataTable";
import './Images.css';


export default function Images() {
    const {id} = useParams();
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        
        function loadImage() {
            return API.get("notes", `/images/${id}`);
        }

        async function onLoad() {
            try {
                const image = await loadImage();
                const { title, imgName } = image;

                image.attatchmentURL = await Storage.get(imgName, { level: 'public' });                

                setTitle(title);
                setImage(image);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);   
    
    if(image){
        console.log(image.tags);
    }
    

    return (
        <div className='Images'>
            <h1>{title}</h1>
            <Tabs defaultActiveKey='Image' id='infoTabs'>
                <Tab eventKey='Image' title='Image'>
                    <Image src={image ? image.attatchmentURL : '#'}></Image>
                </Tab>

                <Tab eventKey='tags' title='Tags'>
                    {image ? <TagTable tags={image.tags} /> : "Loading"}
                </Tab>

                <Tab eventKey='metadata' title='Metadata'>
                    {image ? <MetadataTable items={image.metadata} /> : "Loading"}
                </Tab>
            </Tabs>
        </div>
    );
}