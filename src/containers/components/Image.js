import React from 'react';
import { Link } from 'react-router-dom';

const Image = ({ url, title, imgId }) => (
    <li>
        <Link to={`/image/${imgId}`} >
            <img src={url} alt={title} />
        </Link>
    </li>
);

export default Image;