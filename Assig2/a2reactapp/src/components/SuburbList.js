import React, { useState, useEffect } from 'react';

function SuburbList() {
    const [suburbs, setSuburbs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5147/api/Get_ListCameraSuburbs")
            .then(response => response.json())
            .then(data => setSuburbs(data))
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Select Suburb
            </button>
            <ul className="dropdown-menu overflow-auto" aria-labelledby="dropdownMenuButton" style={{maxHeight: '400px'} }>
                {suburbs.map((suburb, index) =>(
               
                    <li key={index}><a className="dropdown-item" href="#"></a>{suburb}</li>
                ))}
            </ul>
        </div>
    );
}

export default SuburbList;