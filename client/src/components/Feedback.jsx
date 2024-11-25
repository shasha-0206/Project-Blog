import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "react-hot-toast";

const Feedback = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        
        try{
            emailjs.sendForm('', '', form.current, {publicKey: '',})
            toast.success('Email sent')
        }catch(err){
            toast.error('Cound not the send Email')
        }
        
    };

    return (

        <div className="container mt-5">
            <Toaster />
            <h2>Feedback Form</h2>
            <form ref={form} action="/feedback" method="POST">
                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="from_name" required />
                </div>
          
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="form_email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary feedback-submit-btn" onClick={sendEmail}>Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
