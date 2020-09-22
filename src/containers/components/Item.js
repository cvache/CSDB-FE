import React from 'react';
import Container from "./Container";

const Item = ({ searchTerm }) => {
    if (searchTerm === 'null'){
        searchTerm = 'All';
    }
    return (
        <div>
            <h2>{searchTerm} Images</h2>
            <Container searchTerm={searchTerm} />
        </div>
    );
};

export default Item;