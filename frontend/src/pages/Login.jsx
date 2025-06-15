import { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_BACK_API}/api/user`, formData)
            .then((res) => {
                console.log(res.data);
                Cookies.set("token", res.data.token);
                navigate("/admin");
            })
            .catch((err) => {
                alert("Invalid email or password.")
                console.error(err)
            });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome</h2>
                <p>Only admin can log in</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
