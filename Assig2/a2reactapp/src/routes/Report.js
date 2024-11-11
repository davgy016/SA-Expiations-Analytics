import Card from '../components/Card';
import React from 'react';


function Report({ }) {

    return (
        <div>
            <h2 className="text-center">
                Report
            </h2>
            <hr />
            <p>It was made for Report testing</p>
            <div className="row gap-3 p-4">
                <Card className="col-4"
                    key={10}
                    locationId={118}
                    suburbName={"Adelaide"}
                    roadName={"Grote Street/West Terrace"}
                    latitude={-34.929203}
                    longitude={138.587725}
                    totalFee={1}
                    totalDemerits={2}
                    avgDemeritsDaily={3}
                />
                <Card
                    key={20}
                    locationId={170}
                    suburbName={"Clovelly Park"}
                    roadName={"South Road"}
                    latitude={-34.993378}
                    longitude={138.574858}
                    totalFee={1}
                    totalDemerits={2}
                    avgDemeritsDaily={3}
                />
            </div>
           
            <div className="container border rounded bg-light mb-4 ms-2" style={{width: "1020px", textAlign:"justify"} }>
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