import React, { useRef, useEffect } from 'react'; 
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
    const form = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        let isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
        if (!isLoggedIn) {
            localStorage.setItem('redirectMessage', 'You must be logged in to give feedback.');
            navigate('/signin');
        }
    }, []); // Dependency array to run this effect when the component mounts

    const sendEmail = (e) => {
        e.preventDefault(); // Prevent form from submitting normally
        
        emailjs.sendForm('service_h78k659', 'template_eq2rcod', form.current, { publicKey: 'rxsDWPbdFZeeurgIU' })
            .then((result) => {
                toast.success('Email sent'); // Show success toast
                form.current.reset(); // Reset form fields after success
            }, (error) => {
                toast.error('Could not send the email'); // Show error toast
            });
    };

    return (
       <div className="container mt-5 mb-5">
            <Toaster />
            <h2>Feedback Form</h2>
            <form ref={form} onSubmit={sendEmail}>
                <div className="row mb-3 mt-3">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="from_name" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="form_email" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary feedback-submit-btn">Submit</button>
                    </div>
                </div>
            </form>
        </div>

    );
};


export default Feedback;
