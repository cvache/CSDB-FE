import React from 'react';
import { Table } from 'react-bootstrap';


export default function TagTable(props) {
    const tags = props.tags;
    console.log(props.tags);
    if (tags) {
        const tagsWrapped = tags.map((tag, i) => 
            <tbody key={i}>
                <tr>
                    <td>{tag}</td>  
                </tr>
            </tbody>
        );

        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Tags</th>
                    </tr>
                </thead>
                {tagsWrapped}
                
            </Table>
        );
    } else {
        return <h3>No Tags</h3>
    }
    
}