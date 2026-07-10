import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import "../styles/Footer.css"


function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Nepalese Student Association</h3>
                    <a href="https://www.wright.edu" target="_blank">Wright State University</a>
                    <p>Building community, celebrating culture.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <Link to="/about">About</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/constitution">Constitution</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-section">
                    <h3>Get Involved</h3>

                    <a href="#" target="_blank">Program Suggestion Form</a>
                    <a href="#" target="_blank">Feedback Form</a>
                    <a href="#" target="_blank">Volunteer Form</a>

                    <br />

                </div>

                <div className="footer-section">
                    <h3>Follow Our Journey</h3>


                    <a href="mailto:nsa-wsu@raidermail.wright.edu">
                        <MdEmail /> nsa-wsu@raidermail.wright.edu
                    </a>

                    <div className="social-icons">
                        <a
                            href="https://www.instagram.com/nsa_wsu"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.tiktok.com/@nsa.wsu"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    Designed and developed with ❤️ by {" "}
                    <a
                        href="https://www.sindhuaryal.com.np"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="developer-link"
                    >
                        Sindhu Aryal
                    </a>
                </p>
                <p>© 2026 NSA at Wright State University. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer