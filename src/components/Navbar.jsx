import { useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <nav className="navbar">
            <NavLink to="/" style={{ textDecoration: 'none' }}>
                <div className="nav-brand">
                    <span style={{ color: '#dc143c' }}>NSA </span>
                    <span style={{ color: '#cea052' }}>WSU</span>
                </div>
            </NavLink>

            <button
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
            >
                ☰
            </button>

            <div className={`nav-links ${isOpen ? "open" : ""}`}>
                <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
                <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                <NavLink to="/team" onClick={closeMenu}>Team</NavLink>
                <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
                <NavLink to="/news" onClick={closeMenu}>Updates</NavLink>
                <NavLink to="/constitution" onClick={closeMenu}>Constitution</NavLink>
                <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            </div>
        </nav>
    )
}

export default Navbar