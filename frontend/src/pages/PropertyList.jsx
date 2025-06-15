import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/Property.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



function PropertyList() {
    const token = Cookies.get("token");
    const [properties, setProperties] = useState([]);
    const [tab, setTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACK_API}/api/property`, {
            headers: { Authorization: token }
        })
            .then(res => setProperties(res.data))
            .catch(err => console.log(err));
    }, []);

    const center = [23.0225, 72.5714];

    return (
        <div className="propertylist-container">
            <div className="tabs">
                <button className={`tab-button ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>Listing</button>
                <button className={`tab-button ${tab === 1 ? "active" : ""}`} onClick={() => setTab(1)}>Map</button>
                <button className={`tab-button`} onClick={() => navigate("/login")}>Admindashboard</button>
            </div>

            {tab === 0 && (
                <div className="properties-grid">
                    {properties.map(p => (
                        <div key={p._id} className="property-card">
                            <img src={p.image} alt={p.name} />
                            <div className="property-card-content">
                                <h2>{p.name}</h2>
                                <p>{p.address}</p>
                                <p>{p.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 1 && (
                <div className="map-container">
                    <MapContainer center={center} zoom={12} style={{ height: "500px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />

                        {properties.map(p => (
                            <Marker
                                key={p._id}
                                position={[p.latitude, p.longitude]}
                            >
                                <Popup>
                                    <div className="infowindow">
                                        <img src={p.image} alt={p.name} style={{ width: "150px", height: "100px", objectFit: "cover" }} />
                                        <h4>{p.name}</h4>
                                        <p>{p.address}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                    </MapContainer>
                </div>
            )}
        </div>
    );
}

export default PropertyList;
