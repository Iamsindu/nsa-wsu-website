import "../styles/Card.css"

function Card({ children, className = "", clickable = false }) {
    return (
        <div className={`card ${clickable ? "clickable-card" : ""} ${className}`}>
            {children}
        </div>
    )
}

export default Card