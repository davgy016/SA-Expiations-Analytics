import React, { useEffect, useState } from 'react';

function CameraTypeList({ onSelectCameraType } ) {

    const cameraTypesCodeList = ["M", "PAC", "I/section", "P2P", "Rail", "Mid Block"];
    const [selectedCameraType, setSelectedCameraType] = useState("");

    const selectCameraType = (e) => {
        const cameraType = e.target.value;
        setSelectedCameraType(cameraType);
        onSelectCameraType(cameraType);
    }


    return (
        <div className="CameraTypesList">
            <select className="form-select" value={selectedCameraType} onChange={selectCameraType}>
                {/*enable to select suburb from suburblist */}
                <option value="">Select Camera Type</option>
                {cameraTypesCodeList.map((cameraType, index) => (
                    <option key={index} value={cameraType}>
                        {cameraType}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CameraTypeList;