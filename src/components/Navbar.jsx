import { useState } from "react"
import { NavLink } from "react-router-dom"
import "../styles/Navbar.css"
import { ABOUT, CONSTITUTION, CONTACT, EVENTS, HOME, TEAM, UPDATES } from "../constants/route"

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
                <NavLink to={HOME} end onClick={closeMenu}>Home</NavLink>
                <NavLink to={ABOUT} onClick={closeMenu}>About</NavLink>
                <NavLink to={TEAM} onClick={closeMenu}>Team</NavLink>
                <NavLink to={EVENTS} onClick={closeMenu}>Events</NavLink>
                <NavLink to={UPDATES} onClick={closeMenu}>Updates</NavLink>
                <NavLink to={CONSTITUTION} onClick={closeMenu}>Constitution</NavLink>
                <NavLink to={CONTACT} onClick={closeMenu}>Contact</NavLink>
            </div>
        </nav>
    )
}

export default Navbar