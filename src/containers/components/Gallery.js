import React from 'react';
import NoImages from './NoImages';
import Image from './Image';

const Gallery = props => {
    const results = props.data
    let images;
    let noImages;
    if (results.length > 0) {
        images = results.map(image => {
            let src = image.src;
            let title = image.title;
            let imgId = image.imgId;
            /*
            let userId = image.userId;
            let comments = image.comments;
            let createdAt = image.createdAt;
            let imgName = image.imgName;
            let metadata = image.metadata;
            let tags = image.tags;
            */
            return <Image url={src} alt={title} imgId={imgId} />;
        });
    } else {
        noImages = <NoImages />;
    }
    return (
        <div>
            <ul>{images}</ul>
            {noImages}
        </div>
    );
};


export default Gallery;