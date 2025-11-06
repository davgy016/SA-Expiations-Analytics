import React, { useEffect, useRef } from 'react';

const Card = ({ locationId, suburbName, roadName, latitude, longitude, totalFee, totalDemerits, avgFeeDaily, avgDemeritsDaily }) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    //Ref for OpenStreetMap: https://leafletjs.com/examples/quick-start/
    useEffect(() => {
        if (window.L && mapContainerRef.current) {
            if (!mapRef.current) {
                //initialize the map once and store it in mapRef
                mapRef.current = window.L.map(mapContainerRef.current).setView([latitude, longitude], 13);

                //Add the tile layer
                window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                }).addTo(mapRef.current);
            } else {
                //If the map already exists, just update the view
                mapRef.current.setView([latitude, longitude], 13);
            }

            // Add or update the marker
            const marker = window.L.marker([latitude, longitude]).addTo(mapRef.current);
            marker.bindPopup(`<b>${suburbName}</b><br>${roadName}`).openPopup();
        }
    }, [latitude, longitude, suburbName, roadName]);

    //Number formater
    const formatNumber = (number) => {
        return Number(number).toFixed(2);
    }

    return (
        <div className="card mb-3" style={{ width: '500px', height: '600px' }}>
            <div className="row">
                <div>
                    <div
                        // Use ref to reference the map container
                        ref={mapContainerRef}
                        // Unique ID for each map instance
                        id={`map-${locationId}`}
                        style={{ width: '100%', height: '400px' }}
                    ></div>
                    <div className="card-body">
                        <h5 className="card-title">LocationID: {locationId}</h5>
                        <p className="card-text">Total Fee: ${totalFee}</p>
                        <p className="card-text">Total Demerits: {totalDemerits}</p>
                        <p className="card-text">Avg. Daily Fee: ${formatNumber(avgFeeDaily)}</p>
                        <p className="card-text">Avg. Daily Demerits: {formatNumber(avgDemeritsDaily)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
