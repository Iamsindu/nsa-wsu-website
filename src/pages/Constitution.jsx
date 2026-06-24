import "../styles/Constitution.css"


function Constitution() {
    return (
        <main className="constitution-page">
            <section className="page-header">
                <h1>Constitution</h1>
                <p>
                    The Constitution of the Nepalese Student Association at Wright State
                    University serves as the official governing document of the organization.
                </p>
            </section>

            <section className="constitution-card">
                <h2>Official Constitution Document</h2>

                <div className="pdf-viewer">
                    <iframe
                        src="/constitution.pdf"
                        title="NSA WSU Constitution"
                    ></iframe>
                </div>
            </section>
        </main>
    )
}

export default Constitution