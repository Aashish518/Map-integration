import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Admin.css";
import Cookies from "js-cookie";

const AdminDashboard = () => {
    const token = Cookies.get("token");
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        axios.get(`${import.meta.env.VITE_BACK_API}/api/property`, {
            headers: { Authorization: token }
        })
            .then(res => setProperties(res.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_BACK_API}/api/property/${id}`, {
            headers: { Authorization: token }
        })
            .then(() => fetchProperties())
            .catch(err => console.error(err));
    };

    const handleUpdate = (id) => {
        navigate(`/form/${id}`);
    };

    const handleAddProperty = () => {
        navigate("/form");
    };

    const logout = () => {
        Cookies.remove("token");
        navigate("/");
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <div className="add-button-container">
                <button onClick={handleAddProperty} className="add-button">
                    + Add Property
                </button>
                {token ?
                    <button onClick={logout} className="logout-button">Logout</button>
                    : <button onClick={()=>navigate("/login")} className="login-button">Login</button>
                }
            </div>


            <div className="properties-grid">
                {properties.map(p => (
                    <div key={p._id} className="property-card">
                        <img src={p.image} alt={p.name} className="property-image" />
                        <div className="property-content">
                            <h2>{p.name}</h2>
                            <p>{p.address}</p>
                            <div className="card-actions">
                                <button onClick={() => handleUpdate(p._id)} className="card-button update">
                                    Update
                                </button>
                                <button onClick={() => handleDelete(p._id)} className="card-button delete">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
