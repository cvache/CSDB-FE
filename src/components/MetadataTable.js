import React from 'react';
import { Table } from 'react-bootstrap';


export default function MetadataTable(props) {
    const items = props.items;  
    const keys = Object.keys(items);  
    const values = Object.values(items);
    const tableValues = [];
    var i = 0;

    for (i = 0; i < keys.length; i++) {
        tableValues[i] = 
            <tbody key={i}>
                <tr>
                    <td>{keys[i]}</td>
                    <td>{values[i]}</td>
                </tr>
            </tbody>
    }

    return (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            {tableValues}
        </Table>
    );
    
}
    