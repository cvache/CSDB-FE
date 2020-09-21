import React, { createContext, useState } from 'react';
import { API, Storage } from 'aws-amplify';
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const runSearch = async query => {
        const initArr = await API.get("notes", "/images");
        for (const img of initArr) {
            try {
                //TODO: if query isnt abong list of tags, remove from arr
                const src = await Storage.get(img.imgName, {level: 'public'});
                img.src = src;
            } catch (e) {
                console.log("Error fetching images", e);
            }
        }
        setImages(initArr);
        setLoading(false);
    }
    return (
        <PhotoContext.Provider value={{ images, loading, runSearch}}>
            {props.children}
        </PhotoContext.Provider>
    );
};

export default PhotoContextProvider;