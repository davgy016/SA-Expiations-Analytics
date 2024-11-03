import React, { useState } from 'react';

function SuburbList({ suburbs, onSelectSuburb }) {

    const [selectedSuburb, setSelectedSuburb] = useState();

    const selectSuburb = (e) => {
        const suburb = e.target.value;
        setSelectedSuburb(suburb);
        onSelectSuburb(suburb);
    }

    return (
        <div className="suburbList">
            <select className="form-select overflow-auto" value={selectedSuburb} onChange={selectSuburb}>
                {/*enable to select suburb from suburblist */}
                <option>Select Suburb</option>
                {suburbs.map((suburb, index) => (
                    <option key={index} value={suburb}>
                        {suburb}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SuburbList;