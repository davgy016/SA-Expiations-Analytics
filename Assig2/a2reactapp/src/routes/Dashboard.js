import React, { useState, useEffect } from 'react';
import SuburbList from '../components/SuburbList';
import { ThreeDot } from 'react-loading-indicators';
import CameraTypeList from '../components/CameraTypesList';


function Dashboard() {
    const [suburbs, setSuburbs] = useState([]);
    const [suburbDetails, setSuburbDetails] = useState([]);
    const [filteredSubDetails, setFilteredSubDetails] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const maxSelections = 2;
    const [selectedSuburb, setSelectedSuburb] = useState("");
    const [dateTo, setDateTo] = useState("");
    const today = new Date().toString().split("T")[0];
    const [dateFrom, setDateFrom] = useState("2024-01-01");
    const [speedingDescription, setSpeedingDescription] = useState("");
    const [selectedOffenceCode, setSelectedOffenceCode] = useState("");
    const [selectedCameraType, setSelectedCameraType] = useState("");
    const [loading, setLoading] = useState(false);
    const [offences, setOffences] = useState([]);


    // fetch initial list of suburbs when component mounts
    useEffect(() => {
        fetch("http://localhost:5147/api/Get_ListCameraSuburbs")
            .then(response => response.json())
            .then(data => setSuburbs(data))
            .catch(err => {
                console.log(err);
            });
    }, [])

    //fetch suburb details when suburb is selected
    useEffect(() => {
        if (selectedSuburb) {
            suburbSelect(selectedSuburb, selectedOffenceCode)
        }
    }, [selectedSuburb, selectedOffenceCode, dateFrom, dateTo]);

    /**
     * if camera type is selected, then returns new filtered data
     * If camera type is not selected returns sub details
     * this allows to prevent re-rendering the page when camera type is changed and use existing suburbDetails
     */
    useEffect(() => {
        if (selectedCameraType) {
            const filteredData = suburbDetails.filter((c) => c.cameraTypeCode === selectedCameraType);
            setFilteredSubDetails(filteredData);
        } else {
            setFilteredSubDetails(suburbDetails);
        }
    }, [selectedCameraType, suburbDetails]);

    //handle cammera type selection change
    const cameraTypeChange = (cameraType) => {
        setSelectedCameraType(cameraType);
    }


    /**
     * Ref for promises and nested fetches
     * https://javascript.info/async
     * https://www.pluralsight.com/resources/blog/guides/handling-nested-http-requests-using-the-fetch-api
     * https://rapidapi.com/guides/loading-state-react
     */
    const suburbSelect = async (suburb, searchBySpeed) => {

        const startTime = dateFrom ? Math.floor(new Date(dateFrom).getTime() / 1000) : 0;
        const endTime = dateTo ? Math.floor(new Date(dateTo).getTime() / 1000) : 2147483647;
        // Delay loading indicator popping
        const delayIndicator = setTimeout(() => {
            setLoading(true);
        }, 400);

        try {
            //Fetch first suburb details 
            const response1 = await fetch(`http://localhost:5147/api/Get_ListCamerasInSuburb?suburb=${suburb}&cameraIdsOnly=false`);
            const suburbsData = await response1.json();

            // Then fetch expiation Stats by the loc.ID and cam.typeCode,getting this details from first fetch 
            const expSubPromises = suburbsData.map(async (detail) => {
                const { locationId, cameraTypeCode } = detail;

                let apiUrl = `http://localhost:5147/api/Get_ExpiationStatsForLocationId?locationId=${locationId}&cameraTypeCode=${cameraTypeCode}&startTime=${startTime}&endTime=${endTime}`;
                if (searchBySpeed) {
                    apiUrl += `&offenceCodes=${searchBySpeed}`;
                }
                const response2 = await fetch(apiUrl);
                const expiationStats = await response2.json();

                // Merge fetched data from response1 and response2
                return { ...detail, expiationStats };
            });

            // wait for data fetches and then update sub with details with expiation stats 
            const updateLocationDetails = await Promise.all(expSubPromises);
            setSuburbDetails(updateLocationDetails);
            setFilteredSubDetails(updateLocationDetails);
        } catch (err) {
            console.log(err);
        };
        //reset delay function
        clearTimeout(delayIndicator);
        setLoading(false);
    };


    //Reset seleccted checkboxes(locations) when selected suburb change
    useEffect(() => {
        setSelectedLocations([]);
    }, [suburbDetails, selectedCameraType]);


    //function returns boolean whether the index of location is found in selectedLocations array.
    //selectedLocations stores selected locations(checkbox) by user
    const isSelected = (index) => selectedLocations.includes(index);

    /**
     * Reference  for multiselected checkboxes to restrict user select only 2 locations
     * https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/
     * https://altcademy.com/blog/how-to-select-only-one-checkbox-in-a-group-using-reactjs-component/
     * https://stackoverflow.com/questions/65612615/limit-reactjs-input-element-of-type-checkbox-to-2-checked-while-using-usestate-a
     */
    const selectedLocationsChange = (index) => {
        setSelectedLocations((prevCheckedLocations) => {
            if (isSelected(index)) {
                return prevCheckedLocations.filter((location) => location !== index);
            }
            if (prevCheckedLocations.length < maxSelections) {
                return [...prevCheckedLocations, index];
            } else {
                alert(`You can only select ${maxSelections} locations`)
                return prevCheckedLocations;
            }
        });
    };

    //Fetch offences based on speeding inputValue
    useEffect(() => {
        if (speedingDescription) {
            fetch(`http://localhost:5147/api/Get_SearchOffencesByDescription?searchTerm=${speedingDescription}&offenceCodesOnly=false`)
                .then(response => response.json())
                .then(data => setOffences(data))
                .catch(error => console.log(error));

        }
    }, [speedingDescription]);

    //Sets speeding inputValue and immediately checks if it maches offence descriptio. 
    //If so, found offence updates SelectedOffenceCode which then triggers table update
    const SearchChange = (e) => {
        let inputValue = e.target.value;
        setSpeedingDescription(inputValue);

        //get offence code from the speeding search input
        const [offenceCode] = inputValue.split('-').map((item) => item.trim());

        const selectedOffence = offences.find(
            (offence) => offence.offenceCode === offenceCode
        );

        if (selectedOffence) {
            setSelectedOffenceCode(selectedOffence.offenceCode);
        } else {
            setSelectedOffenceCode("");
        }
    };


    //handle Date To date change
    const dateToChange = (e) => {
        const newDateTo = e.target.value;
        if (newDateTo > today) {
            alert("Date cannot be later than today")
            return;
        }
        if (newDateTo < dateFrom) {
            alert("Date To cannot be earlier than Date From")
            return;
        }
        setDateTo(newDateTo);
    }

    //handle Date From date change
    const dateFromChange = (e) => {
        const newDateFrom = e.target.value;
        if (newDateFrom > today) {
            alert("Date From cannot be later than today")
            return;
        }
        if (newDateFrom > dateTo) {
            alert("Date From cannot be later than Date To")
            return;
        }
        setDateFrom(newDateFrom);
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <div className="filters row justify-content-end p-4 mb-4">
                <div className="col-4">
                    <input list="speedingDescription" type="text" name="searchText" value={speedingDescription} onChange={SearchChange} placeholder="Search by Speeding" className="searchSpeeding form-control" />
                    <datalist id="speedingDescription">
                        {offences.length > 0 && offences.map((offence, index) => (
                            <option
                                key={index}
                                value={`${offence.offenceCode}-${offence.description}`} />
                        ))}
                    </datalist>

                </div>

                <div className="col-2">
                    <CameraTypeList onSelectCameraType={cameraTypeChange} />
                </div>

                <div className="col-2">
                    {/* Display SuburbList in the dashboard */}
                    <SuburbList suburbs={suburbs} onSelectSuburb={setSelectedSuburb} />
                </div>

                <div className="col-2">
                    <input type="date" className="dateFrom form-control" value={dateFrom} onChange={dateFromChange} />
                </div>
                <div className="col-2">
                    <input type="date" className="dateTo form-control" onChange={dateToChange} />
                </div>
            </div>

            {/*Loading indicator animation*/}          
            {/*If suburb is not selected show show filters and message Select suburb*/}
            {loading ? (
                <div><ThreeDot variant="bounce" color="#32cd32" speedPlus="0" size="medium" text="loading" textColor="" /></div>
            ) : !selectedSuburb ? (
                <p>Select Suburb</p>
            ) : (
                //Table is displayed if there are locations after filtering otherwise shows message "The location could not find"
                filteredSubDetails.length > 0 && filteredSubDetails.filter((d) => !speedingDescription || d.expiationStats?.totalOffencesCount > 0).length > 0 ? (
                    <div className="p-4">
                        <table className="table table-striped">

                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>Select</th>
                                    <th style={{ width: '10%', textAlign: 'center', paddingLeft: '15px' }}>Location ID</th>
                                    <th style={{ paddingLeft: '30px' }}>Suburb</th>
                                    <th style={{ textAlign: 'center' }}>Camera Type</th>
                                    <th style={{ paddingLeft: '70px' }}>Rd Name</th>
                                    <th style={{ width: '17%', textAlign: 'right' }}>Offences</th>
                                    <th style={{ textAlign: 'right' }}>Speeding</th>
                                    <th style={{ textAlign: 'center', paddingLeft: '35px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*when speeding search is empty, shows all locations with 0 offences as well.
                                        otherwise, based on the speeding search shows the locations the one has offences more than 0 */}
                                {filteredSubDetails.filter((d) => {
                                    if (speedingDescription) {
                                        return d.expiationStats?.totalOffencesCount !== 0;
                                    }
                                    return true;
                                }).map((d, index) => (
                                    <tr key={index}>
                                        <td style={{ width: '5%', textAlign: 'center' }}>
                                            <input className="form-check-input"
                                                type="checkbox" value=""
                                                checked={isSelected(index)}
                                                onChange={() => selectedLocationsChange(index)}
                                                disabled={!isSelected(index) && selectedLocations.length >= maxSelections} />
                                        </td>
                                        <td style={{ width: '10%', textAlign: 'center', paddingRight: '45px' }}>{d.locationId}</td>
                                        <td style={{ width: '15%', paddingLeft: '30px' }}>{d.suburb}</td>
                                        <td style={{ width: '15%', paddingLeft: '30px' }}>{d.cameraType1}</td>
                                        <td style={{ width: '23%', paddingLeft: '40px' }}>{d.roadName}, {d.roadType}</td>
                                        <td style={{ textAlign: 'center', paddingRight: '50px' }}>{d.expiationStats?.totalOffencesCount || "N/A"}</td>
                                        <td style={{ textAlign: 'center', paddingRight: '35px' }}>10</td>
                                        <td style={{ textAlign: 'center', paddingLeft: '35px' }}>Warning</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (<p>Location could not find</p>)
            )}
        </div>
    );
}

export default Dashboard;

