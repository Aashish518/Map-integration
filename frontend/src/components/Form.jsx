import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/Form.css";
import Cookies from "js-cookie";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadowPng,
    shadowSize: [41, 41]
});

const PropertyForm = () => {
    const { id } = useParams();
    const token = Cookies.get("token");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        latitude: 23.0225,
        longitude: 72.5714,
        image: null
    });
    const [status, setStatus] = useState(true);

    useEffect(() => {
        if (id) {
            axios.get(`${import.meta.env.VITE_BACK_API}/api/property/${id}`, {
                headers: { Authorization: token }
            })
                .then(res => {
                    const { name, description, address, latitude, longitude } = res.data;
                    setFormData({
                        name,
                        description,
                        address,
                        latitude,
                        longitude,
                        image: null
                    });
                })
                .catch(err => console.error("Error loading property:", err));
        }
    }, [id, token]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setFormData(prev => ({
                    ...prev,
                    latitude: lat.toFixed(6),
                    longitude: lng.toFixed(6)
                }));
            }
        });
        return formData.latitude && formData.longitude ? (
            <Marker position={[formData.latitude, formData.longitude]} icon={customIcon} />
        ) : null;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const propertyData = new FormData();
        propertyData.append("name", formData.name);
        propertyData.append("description", formData.description);
        propertyData.append("address", formData.address);
        propertyData.append("latitude", formData.latitude);
        propertyData.append("longitude", formData.longitude);
        if (formData.image) propertyData.append("image", formData.image);

        if (id) {
            setStatus(false);
            axios.put(`${import.meta.env.VITE_BACK_API}/api/property/${id}`, propertyData, {
                headers: { Authorization: token }
            })
                .then(() => {
                    navigate("/admin");
                    setStatus(true);
                })
                .catch(err => {
                    console.error("Update error:", err);
                    setStatus(true);
                });
        } else {
            setStatus(false);
            axios.post(`${import.meta.env.VITE_BACK_API}/api/property`, propertyData, {
                headers: { Authorization: token }
            })
                .then(() => {
                    navigate("/admin");
                    setStatus(true);
                })
                .catch(err => {
                    console.error("Add error:", err);
                    setStatus(true);
                });
        }
    };

    return (
        <div className="container">
            <h2>{id ? "Update Property" : "Add Property"}</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Latitude</label>
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Longitude</label>
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Property Image</label>
                    <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="form-group">
                    <label>Select Location on Map</label>
                    <MapContainer
                        center={[formData.latitude, formData.longitude]}
                        zoom={12}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>

                <button type="submit" className="button" disabled={!status}>
                    {id ? "Update Property" : "Add Property"}
                </button>
            </form>
        </div>
    );
};

export default PropertyForm;
