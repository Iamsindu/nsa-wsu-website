import { advisor, executiveTeam, coreTeam, foundingMembers } from "../data/teamData"
import "../styles/Team.css"

function TeamCard({ member }) {
    const cardContent = (
        <>
            <img src={member.image} alt={member.name} className="team-photo" />

            <h3>{member.name}</h3>

            <h4>{member.position}</h4>

            {member.email && <p>{member.email}</p>}
        </>
    )

    return member.website ? (
        <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="team-card-link"
        >
            <div className="team-card clickable">{cardContent}</div>
        </a>
    ) : (
        <div className="team-card">{cardContent}</div>
    )
}

function Team() {
    return (
        <main>
            <section className="page-header">
                <p className="team-year">Academic Year 2026–2027 Executive Committee</p>
                <p className="team-description">
                    Meet the dedicated leaders working to build community and celebrate
                    Nepali culture at WSU.
                </p>
            </section>

            <section className="team-section">
                <h2>Executive Committee</h2>
                <div className="team-grid">
                    {executiveTeam.map((member) => (
                        <TeamCard key={member.name} member={member} />
                    ))}
                </div>
            </section>

            <section className="team-section">
                <h2>Executive Team</h2>
                <div className="team-grid">
                    {coreTeam.map((member) => (
                        <TeamCard key={member.name} member={member} />
                    ))}
                </div>
            </section>

            <section className="team-section">
                <h2>Advisor</h2>
                <div className="team-grid advisor-grid">
                    {advisor.map((member) => (
                        <TeamCard key={member.name} member={member} />
                    ))}
                </div>
            </section>

            {/* <section className="team-section">
                <h2>Past Board Members</h2>
                <div className="team-grid advisor-grid">
                    {foundingMembers.map((member) => (
                        <TeamCard key={member.name} member={member} />
                    ))}
                </div>
            </section> */}
        </main>
    )
}

export default Team