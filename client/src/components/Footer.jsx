import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


const Footer = () => {

    const redirect = (e) =>{
        if(e === 'G'){
            window.location.href = 'https://github.com/shasha-0206'
        }
        else if(e === 'T'){
            window.location.href = 'https://x.com/shashankku73150'
            
        }
        else if(e === 'L'){
            window.location.href = 'https://www.linkedin.com/in/shashank-kumar-9a4125311/'
            
        }
        else{
            window.location.href = 'https://www.instagram.com/02_shasha_06/'
            
        }
    }
    return (
        <footer className="bg-dark text-light py-5 " style={{marginTop:'100px'}}>
            <Container>
                <Row className="justify-content-between">
                    <Col md={4}>
                        <h5>🌟 BlogBliss </h5>
                        <p>
                            Create a Space for Your Voice. Unleash Your Creativity, Share Your Knowledge, and Inspire Others through Your Blog.
                        </p>
                        <div className="d-flex gap-3 mt-3">

                            <i className="fab fa-github" style={{cursor:"pointer"}} onClick={() => redirect("G")}></i>
                            <i className="fab fa-twitter" style={{cursor:"pointer"}} onClick={() => redirect("T")}></i>
                            <i className="fab fa-linkedin-in" style={{cursor:"pointer"}} onClick={() => redirect("L")}></i>
                            <i className="fab    fa-instagram" style={{cursor:"pointer"}} onClick={() => redirect("I")}></i>

                        </div>
                    </Col>
                    <Col md={2}>
                        <h6 className="text-uppercase">Navigation</h6>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-light text-decoration-none">About</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Articles</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Projects</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h6 className="text-uppercase">Categories</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {['Design', 'Development', 'Tutorial', 'Career', 'Life'].map(category => (
                                <span key={category} className="badge bg-secondary">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </Col>
                    <Col md={3}>
                        <h6 className="text-uppercase">Get in Touch</h6>
                        <p>Have a question or feedback? We'd love to hear from you.</p>
                        <Button variant="secondary" className="mt-2">
                            Contact Us &rarr;
                        </Button>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
