import Card from "../components/Card"
import "../styles/About.css"
function About() {
    return (
        <main className="about-page">
            <section className="page-header">
                <p>
                    Founded in 2023, the Nepalese Student Association (NSA) at Wright State
                    University is a student-led organization created to help Nepali students
                    feel at home on campus while building a strong sense of community,
                    belonging, and cultural pride.
                </p>
            </section>

            <section className="about-grid">
                <Card>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to support Nepali students academically, socially, and
                        culturally by creating a welcoming environment where students can build
                        meaningful connections and thrive throughout their university journey.
                    </p>
                </Card>

                <Card>
                    <h2>Our Vision</h2>
                    <p>
                        We envision NSA WSU as a home away from home where students feel
                        connected, empowered, and proud to celebrate Nepali heritage within
                        the Wright State community.
                    </p>
                </Card>

            </section>

            <section className="about-section">
                <Card>
                    <h2>What We Do</h2>
                    <p>
                        NSA WSU organizes cultural programs, social gatherings, and community
                        events throughout the year. Our signature events include
                        <strong> Nepalese Night</strong>, typically held in April, and
                        <strong> Dashain Celebration</strong>, celebrated around September or
                        October. Through these events, we promote Nepali culture, strengthen
                        friendships, and create lasting memories for students and the broader
                        community.
                    </p>
                </Card>
            </section>
        </main>
    )
}

export default About