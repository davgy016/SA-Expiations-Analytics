import Card from '../components/Card';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThreeDot } from 'react-loading-indicators';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';


function Report({ }) {
    const location = useLocation();
    const { selectedDetails, filterSearchDetails } = location.state || {
        selectedDetails: [], filterSearchDetails: {}
    };
    const [loading, setLoading] = useState(false);
    const [expiationStats, setExpiationStats] = useState([]);
    const filters = Object.entries(filterSearchDetails);

    const keyNames = {
        selectedSuburb: "Selected Suburb",
        selectedCameraType: "Camera Type",
        dateFrom: "Start Date",
        dateTo: "End Date",
        speedingDescription: "Speeding Description"
    };

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const statsPromises = selectedDetails.map(async (detail) => {
                    const { locationId, cameraTypeCode } = detail;
                    let expUrl = `http://localhost:5147/api/Get_ExpiationStatsForLocationId?locationId=${locationId}&cameraTypeCode=${cameraTypeCode}&startTime=0&endTime=2147483647`;

                    const response = await fetch(expUrl);
                    const data = await response.json();

                    return { ...detail, expiationStats: data };
                });
                const stats = await Promise.all(statsPromises);
                setExpiationStats(stats);
            } catch (error) {
                console.error("Failed", error);
            }
        };
        fetchStats();
        setLoading(false);
    }, [selectedDetails]);


    return (
        <div>
            <h2 className="text-center">
                Report
            </h2>
            <hr />
            <div className="text-start ms-3">
                <h4 style={{ display: "inline" }}>Search Details: </h4>
                {/*get applied filters from dashboard*/}
                {filters.map(([key, value], index) => (
                    value ? (
                        <span key={index} style={{ marginLeft: "10px" }}>{keyNames[key] || key}: {value} </span>
                    ) : null
                ))}
            </div>
            <div className="row mt-5 mb-5">
                <img src={image1} alt="Filter Screenshot" style={{ maxHeight: "30%", maxWidth: "50%" }}></img>
                <img src={image2} alt="Filter Screenshot" style={{ maxHeight: "30%", maxWidth: "50%" }}></img>
            </div>
            {loading ? (
                <div><ThreeDot variant="bounce" color="#32cd32" speedPlus="0" size="medium" text="loading" textColor="" /></div>
            ) : (



                <div className="row gap-3 p-4">
                    {expiationStats.map((d, index) => (

                        <Card className="col-4"
                            key={index}
                            locationId={d.locationId}
                            suburbName={d.suburb}
                            roadName={index === 0 ? "Grote Street/West Terrace" : "South Road"}
                            latitude={index === 0 ? -34.929203 : -34.993378}
                            longitude={index === 0 ? 138.587725 : 138.574858}
                            //roadName={"Grote Street/West Terrace"}
                            //latitude={-34.929203}
                            //longitude={138.587725}
                            totalFee={d.expiationStats.totalFeeSum || "N/A"}
                            totalDemerits={d.expiationStats.totalDemerits || "N/A"}
                            avgFeeDaily={d.expiationStats.avgFeePerDay || "N/A"}
                            avgDemeritsDaily={d.expiationStats.avgDemeritsPerDay || "N/A"}
                        />
                    ))}
                    {/*<Card*/}
                    {/*    key={20}*/}
                    {/*    locationId={170}*/}
                    {/*    suburbName={"Clovelly Park"}*/}
                    {/*    roadName={"South Road"}*/}
                    {/*    latitude={-34.993378}*/}
                    {/*    longitude={138.574858}*/}
                    {/*    totalFee={1}*/}
                    {/*    totalDemerits={2}*/}
                    {/*    avgDemeritsDaily={3}*/}
                    {/*/>*/}
                </div>
            )}

            <div className="container border rounded bg-light mb-4 ms-2" style={{ width: "1020px", textAlign: "justify" }}>
                <div >
                    <p>The use of mobile phones while driving significantly increases the risk of traffic accidents. Mobile Phone Detection Cameras (MPDCs) are an effective tool to mitigate this risk. This report identifies two high-traffic locations in Adelaide for MPDC installation based on expiation data and safety considerations.
                    </p>
                </div>
                <div className="row">
                    <div className="col-6" >
                        <div className="p-3 border rounded mb-3 bg-light">
                            <p className="mb-0 ">
                                <span className="fw-bold">Location 1: </span>
                                This busy intersection has 1,174 issued expiations (excluding rejections) and 3,594 photo-rejected expiations. This location belongs to Eastern District LSA, which is ranked second in overall expiations with 33,865 and has the highest mobile usage offence count at 878. The long wait times at traffic lights encourage drivers to use their phones, that increases accident risk. Additionally, the intersection is known for frequent collisions. Installing MPDCs here would discourage distracted driving and improve overall safety.
                            </p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 border rounded bg-light">
                            <p className="mb-0">
                                <span className="fw-bold">Location 2: </span>
                                South Road, Clovelly Park belongs to South District LSA. This LSA has 36,956 total issued expiations but only 429 for mobile usage, half the Eastern District LSA’s rate. This discrepancy suggests insufficient MPDC coverage. The PAC camera at this site recorded 1,039 issued and 467 rejected expiations. High pedestrian activity and significant expiation numbers make this location critical for MPDC installation, ensures driver attentiveness and reduces risk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report