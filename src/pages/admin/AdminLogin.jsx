import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import "../../styles/AdminLogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import { ADMIN_DASHBOARD } from "../../constants/route.js";

function AdminLogin() {
    const { checkAuth } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await login(email, password);
            await checkAuth();
            navigate(ADMIN_DASHBOARD, { replace: true });

            console.log("Login response:", response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">
            <section className="admin-login-card">
                <div className="admin-login-accent" />

                <div className="admin-login-header">
                    <div className="admin-login-logo">
                        <span className="logo-red">NSA</span>
                        <span className="logo-gold"> WSU</span>
                    </div>

                    <h1>Admin Portal</h1>

                    <p className="admin-login-subtitle">
                        Sign in to manage updates, events and team information.
                    </p>
                </div>

                <form
                    className="admin-login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="admin-form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Enter your admin email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="admin-form-group">
                        <label htmlFor="password">Password</label>

                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="admin-login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="admin-login-footer">
                    <a href="/">
                        ← Back to NSA WSU Website
                    </a>
                </div>
            </section>
        </main>
    );
}

export default AdminLogin;