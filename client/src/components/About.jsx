import React from 'react';

const About = () => {
    return (
        <div
            className="container mt-5 p-4 rounded shadow-lg"
            style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
            }}
        >
            <div className="about-container text-center">
                <h3
                    className="mb-4"
                    style={{ color: 'black', fontWeight: 'bold' }}
                >
                    About Us
                </h3>

                <p className="mb-5" style={{ fontSize: '18px', color: '#6c757d' }}>
                    We're passionate about helping you create engaging and informative content.
                    Our AI-powered blog platform is designed to simplify the blogging process,
                    from idea generation to publication.
                </p>

                <h5 style={{ fontWeight: '600' }}>What We Offer?</h5>

                <ul className="list-unstyled my-4">
                    <li className="mb-3">
                        <b>Effortless Content Creation:</b>&nbsp;
                        <span style={{ color: '#495057' }}>
                            Generate fresh, relevant blog posts with our advanced AI writing assistant.
                        </span>
                    </li>
                    <li className="mb-3">
                        <b>Intelligent Summarization:</b>&nbsp;
                        <span style={{ color: '#495057' }}>
                            Condense lengthy articles into concise summaries, saving you time and effort.
                        </span>
                    </li>
                    <li className="mb-3">
                        <b>Intuitive User Interface:</b>&nbsp;
                        <span style={{ color: '#495057' }}>
                            A user-friendly platform that makes blogging a breeze.
                        </span>
                    </li>
                    <li>
                        <b>Seamless Content Management:</b>&nbsp;
                        <span style={{ color: '#495057' }}>
                            Easily create, edit, and delete blog posts.
                        </span>
                    </li>
                </ul>

                <h5 className="mt-4" style={{ fontWeight: '600', color: '#343a40' }}>
                    Our Mission:
                </h5>

                <p
                    className="mb-4"
                    style={{ fontSize: '16px', lineHeight: '1.6', color: '#6c757d' }}
                >
                    To empower individuals and businesses to share their stories and ideas
                    with the world. By leveraging the power of AI, we strive to make content
                    creation more efficient and effective.
                </p>

                <h5 className="mt-4" style={{ fontWeight: '600', color: '#343a40' }}>
                    Join the Future of Blogging:
                </h5>

                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#6c757d' }}>
                    Experience the next generation of blogging with our AI-powered platform.
                    Start creating amazing content and create space for your voice.
                </p>

                {/* <button
                    className="btn btn-primary mt-4"
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    Get Started
                </button> */}
            </div>
        </div>
    );
};

export default About;
