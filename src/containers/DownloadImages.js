import React, { useState, useEffect } from 'react';
import { useAppContext } from "../libs/contextLib";
import { Link } from 'react-router-dom';
import "./DownloadImages.css";
import { Image } from 'react-bootstrap';
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
            } catch (e) {
                onError(e);
            }

            console.log("Finished loading effects")
            setIsLoading(false);
        }
        

        onLoad();
    }, [isAuthenticated]);

    useEffect(() => {
        loadImageSrcs();
    });

    async function loadImageSrcs() {
        
    }

    async function loadImageInfo() {
        const initArr = await API.get("notes", "/images");
        for (const img of initArr) {
            try {
                const src = await Storage.get(img.imgName, {level: 'public'});
                img.src = src;
            } catch (e) {
                onError(e);
            }
            
            
        }
        return initArr;
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    function ezLoad() {
        console.log("Attempted load");
        const buffer = images.map((image, i) => {
            return (
                <div id={i} key={i}>
                    <Image key={i} src={image.src} />
                </div>
            );
        });

        console.log(buffer);
        return (
            <div id='buffer'>
                {buffer}
            </div>
        );
    }
    /*
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
    */

    async function getImgSrc(imgName) {
        return await Storage.get(imgName, {level: 'public'});
    }

    console.log("Images: ");
    console.log(images);
    return (
        <>
            {images.map(d => 
            <Link to={`/image/${d.imgId}`}>
                <Image src={d.src} alt="loading..."/>
            </Link>)}
        </>
 
            
    );
}