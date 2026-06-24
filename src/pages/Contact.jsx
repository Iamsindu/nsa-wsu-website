import Card from "../components/Card"
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa"
import "../styles/Contact.css"

function Contact() {
    return (
        <main>
            <section className="page-header">
                <p className="contact-description">
                    Have questions, suggestions, or want to collaborate with NSA WSU?
                    We’d love to hear from you. Feel free to reach out through email or social media.
                </p>
            </section>

            <section className="contact-grid">
                <Card className="contact-card">
                    <h2>Get in Touch</h2>

                    <div className="contact-item">
                        <FaEnvelope />
                        <a href="mailto:nsa-wsu@raidermail.wright.edu">
                            nsa-wsu@raidermail.wright.edu
                        </a>
                    </div>

                    <p>Wright State University</p>
                    <p>Dayton, Ohio</p>
                </Card>

                <Card className="contact-card">
                    <h2>Follow Us</h2>

                    <a
                        href="https://www.instagram.com/nsa_wsu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <FaInstagram /> Instagram
                    </a>

                    <a
                        href="https://www.tiktok.com/@nsa.wsu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <FaTiktok /> TikTok
                    </a>
                </Card>
            </section>
        </main>
    )
}

export default Contact