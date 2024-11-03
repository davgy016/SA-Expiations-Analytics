import React, { useState, useEffect } from 'react';
import SuburbList from '../components/SuburbList';

function Dashboard() {
    const [suburbs, setSuburbs] = useState([]);
    const [suburbDetails, setSuburbDetails] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5147/api/Get_ListCameraSuburbs")
            .then(response => response.json())
            .then(data => setSuburbs(data))
            .catch(err => {
                console.log(err);
            });
    }, [])

    const suburbSelect = (selectedSuburb) => {
        if (selectedSuburb) {
            fetch(`http://localhost:5147/api/Get_ListCamerasInSuburb?suburb=${selectedSuburb}&IdsOnly=false`)
                .then(response => response.json())
                .then(data => setSuburbDetails(data))
                .catch(err => console.log(err));
        }
        else {
            setSuburbDetails([]);
        }

    };
   
    

    
   /**
    * Reference  for multiselected checkboxes to restric user select only 2 locations
    * https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
    * https://altcademy.com/blog/how-to-select-only-one-checkbox-in-a-group-using-reactjs-component/
    * https://stackoverflow.com/questions/65612615/limit-reactjs-input-element-of-type-checkbox-to-2-checked-while-using-usestate-a
    */
    const selectedLocationsChange = (index) => {
        setSelectedLocations((prevCheckedLocations) => {
            if (prevCheckedLocations.includes(index)) {
                return prevCheckedLocations.filter((location) => location != index);
            }
            if (prevCheckedLocations.length < 2) {
                return [...prevCheckedLocations, index];
            } else {
                alert("You can only select 2 locations")
                return prevCheckedLocations;
            }
        });
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div className="filters row justify-content-end p-4 mb-4">
                <div className="col-2">
                    <input type="text" placeholder="Search by Speeding" className="searchSpeeding form-control">
                    </input>
                </div>

                <div className="col-2">
                    {/* Display SuburbList in the dashboard */}
                    <SuburbList suburbs={suburbs} onSelectSuburb={suburbSelect} />
                </div>

                <div className="col-2">
                    <input type="date" className="dateFrom form-control" />
                </div>
                <div className="col-2">
                    <input type="date" className="dateTo form-control" />
                </div>
            </div>

            <div className="p-4">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Suburb</th>
                            <th>Camera Type</th>
                            <th>Rd Name</th>
                            <th>Offences</th>
                            <th>Rejected Expiations</th>
                            <th>Compliance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suburbDetails.map((d, index) => (
                            <tr key={index}>
                                <th><input className="form-check-input" type="checkbox" value="" checked={selectedLocations.includes(index)} onChange={() => selectedLocationsChange(index)} disabled={!selectedLocations.includes(index) && selectedLocations >= 2} /></th>
                                <td>{d.suburb}</td>
                                <td>{d.cameraType1}</td>
                                <td>{d.roadName}, {d.roadType}</td>
                                <td>1000</td>
                                <td>10</td>
                                <td>Warning</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;

