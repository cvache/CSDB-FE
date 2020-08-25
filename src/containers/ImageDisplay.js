import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';
import { Storage } from 'aws-amplify';



export default function ImageDisplay(props) {
    /*props.images should be formatted as follows
    [
        {
            src: imgName, #for loading the image from S3
            imgID: id, #For loading the image data/redirection
            tags: [
                tag1,
                tag2
                ]

        },
    ]
    */

    const { images } = props;
    const toRender = images.length;
    const rows = Math.ceil(toRender/5);

    const imgList = [];
    for (var i = 0; i < rows; i++) {
       imgList[i] = [];
    }

    for (var arrayLoop = 0; arrayLoop < rows; arrayLoop++) {
       for (var innerLoop = 0; innerLoop < 5; innerLoop++) {
            imgList[arrayLoop].push(images.pop());
       }
    }


    async function getImgSrc(imgName) {
       return await Storage.get(imgName, { level: 'public' });
    }

   //5 images (full)
   function renderRow(images, i) {
        console.log("att 5");
        console.log(images[0]);
        console.log(images[0].src);
       
        return (
            <Row key={i}>
                <Col key='1'><Image src={getImgSrc(images[0].imgName)} alt='#'/></Col>
                <Col key='2'><Image src={images[1] ? images[1].src : '#'}/></Col>
                <Col key='3'><Image src={Storage.get(images[2].imgName, { level: 'public' })} alt='#'/></Col>
                <Col key='4'><Image src={images[3].src} alt='#' /></Col>
                <Col key='5'><Image src={images[4].src} alt='#'/></Col>
            </Row>
       );
    }
   //4
    function renderRowFour(images, i) {
        console.log("att 4");

        return (
            <Row key={i}>
                <Col><Image src={images[0].src} /></Col>
                <Col><Image src={images[1].src} /></Col>
                <Col><Image src={images[2].src} /></Col>
                <Col><Image src={images[3].src} /></Col>
                <Col></Col>
            </Row>
        );
    }
    //3
    function renderRowThree(images, i) {
        console.log("att 3");

        return (
            <Row key={i}>
                <Col><Image src={images[0].src} /></Col>
                <Col><Image src={images[1].src} /></Col>
                <Col><Image src={images[2].src} /></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        );
    }
    //2
    function renderRowTwo(images, i) {
        console.log("att 2");

        return (
            <Row key={i}>
                <Col><Image src={images[0].src} /></Col>
                <Col><Image src={images[1].src} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        );
    }
    //1
    function renderRowOne(images, i) {
        console.log("att 1");

        return (
            <Row key={i}>
                <Col><Image src={images[0].src} /></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        );
    }

    function renderLast() {
        switch(images.length) {
            case 4:
                renderRowFour();
                break;
            case 3:
                renderRowThree();
                break;
            case 2:
                renderRowTwo();
                break;
            case 1: 
                renderRowOne();
                break;
            default:
                return null;
            
        }
    }

    function renderFull() {
        const buffer = [];
        for (var i = 0; i < rows; i++){
            console.log("Rendering a full row!")
            buffer.push(renderRow(imgList[i]), i);
        }
        buffer.push(renderLast());
        console.log("Done rendering");
        console.log(buffer);
        return (
            <div>
               {buffer}
            </div>
       )
    }

    

       
    return (
    <div>
        {renderFull()}
    </div>
    );
   




}