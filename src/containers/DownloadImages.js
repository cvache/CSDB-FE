import React, { useState, useEffect } from 'react';
import { useAppContext } from "../libs/contextLib";
import "./DownloadImages.css";
import { Image, Col, Row } from 'react-bootstrap';
import { onError } from '../libs/errorLib';
import { API, Storage } from 'aws-amplify';


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
                const images = await loadImageInfo();
                setImages(images);
                loadImages();
            } catch (e) {
                onError(e);
            }

            console.log("Finished loading")
            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    async function loadImageInfo() {
        const imageList = await API.get("notes", "/images")
        return imageList;
    }
    
    async function loadImages() {
        images.forEach(async item => {
            item.src = await Storage.get(item.imageName, { level: 'public' });
        });
    }

    function constructImageGrid() {
        const buffer = [];
        const imgList = [];
        const rows = Math.ceil(images.length/5);

        //seed the inital array like [[],[],[],[],[]]
        for (var i = 0; i < rows; i++) {
            imgList[i] = [];
        }

        //fill each inner array with 5 (or less) images
        for (var arrayLoop = 0; arrayLoop < rows; arrayLoop++) {
            for (var innerLoop = 0; innerLoop < 5; innerLoop++) {
                 imgList[arrayLoop].push(images.pop());
            }
        }

        let counter = 0;
        while (imgList.length !== 0) {
            const singleList = imgList.pop()
            console.log(singleList);
            //fill so we have 5 in EVERY list
            while (singleList.length < 5) {
                singleList.push(null);
            }
            //serve as a small buffer to hold the 5 cols
            const miniBuffer = []
            for (var j = 0; j < 5; j++){
                if (singleList[j]) {
                    miniBuffer.push(
                    <Col 
                    key={singleList[j].imgId}
                    >
                        <Image 
                        key={singleList[j].imgId + "img"} 
                        src={singleList[j] ? singleList[j].src : '#'} 
                        />
                    </Col>
                    );
                } else {
                    miniBuffer.push(<Col key={j + 'null'}></Col>)
                }
            }
            console.log(miniBuffer);
            buffer.push(<Row key={counter}>{miniBuffer}</Row>);
            counter++;
        }
        console.log(buffer);

        return <div>{buffer}</div>
    }
    
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (<div className='mainOut'>
                {constructImageGrid()}
                </div>
            )}
        </div>
            
    );
    

}

/*
    <Image 
    key={singleList[j].imgId + "img"} 
    src={singleList[j] ? singleList[j].src : '#'} 
    />
    */