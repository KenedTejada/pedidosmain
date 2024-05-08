import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapContainer = (latLng: any) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyD_ROi4IohxriSnWXY2TJWsfAx2PDdea6I',
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const containerStyle = {
        width: '100%',
        height: '100%',
    };

    const position = {lat: latLng.position.lat, lng: latLng.position.lng};
    console.log(position);

    const onLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    const onUnmount = () => {
        setMap(null);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div style={{ marginTop: '20px', height: '400px' }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={5}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Marcador opcional */}
                <Marker position={position} />
            </GoogleMap>
        </div>
    );
};

export default MapContainer;