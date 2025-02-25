import React, { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import "./NewContactPage.css";
import Support from './Support';
import WorkLoc from './WorkLoc';
import img1 from '/support.png';
import img2 from '/media.png';
import img3 from '/payment.png';
import img4 from '../../assets/images/workImg.svg';
import { useNavigate } from 'react-router-dom';

const Contactform = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [loading, setLoading] = useState(false); // Loading state
    const [sent, setSent] = useState(false); // Sent state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone' && !/^\d*$/.test(value)) { // Allow only digits
            toast.error("Phone number must contain only digits.");
            return; // Prevent state update for invalid input
        }
        setFormData((currData) => ({
            ...currData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {

            const resp = await axios.post(`${import.meta.env.VITE_LOCAL_HOST}/zakatcare/contact`, formData, { withCredentials: true });
            if (resp.status === 200) {
                console.log(resp.data);
                toast.success("Form submitted successfully!");
                setSent(true); // Mark as sent
                navigate('/form-submitted')
            }

        } catch (error) {
            if (error.status === 403) {
                toast.error("Phone number exists");
                setLoading(false)
                return
            }
            console.error('Error:', error);
            toast.error("Failed to submit the form. Please try again.");
        }

        setLoading(false); // Stop loading

        // Reset the form data only if it's not sent
        if (!sent) {
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
        }
    };

    return (
        <>
            <div className="contactForm">
                <div className="contactHead flex justify-center items-center">
                    <h2>
                        Feel free to contact us. <br />
                        We’ll glad to hear from you.
                    </h2>
                </div>
                <br /><br />
                <div className="form container">
                    <form onSubmit={handleSubmit}>
                        <label>Your Name<br /></label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            name='name'
                            required
                            placeholder="Enter your name"
                        />
                        <label>Your email<br /></label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            name='email'
                            required
                        />
                        <label>Contact<br /></label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                            name='phone'
                            required
                        />
                        <label>Your Message<br /></label>
                        <textarea
                            name="message"
                            cols="5"
                            rows="10"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder='Enter your message'
                            required
                        ></textarea>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit" disabled={loading || sent}>
                                {sent ? (
                                    <>
                                        Sent Successfully <i className="bi bi-check2"></i>
                                    </>
                                ) : loading ? (
                                    "Sending..."
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                    {/* Show loader when loading */}
                </div>
            </div>
            <br /><br />
            <div className="question flex flex-column justify-evenly items-center">
                <div className="question_hero mb-12">
                    <h2>Got a question?</h2>
                    <p>Contact one of the departments to solve your problem.</p>
                </div>
                <div className="ques_support container d-flex justify-between mt-4 text-center">
                    <Support img={img1} head="Support" desc="We’re here to answer any question about the product" />
                    <Support img={img2} head="Media" desc="Get our news, company info, and media resources" />
                    <Support img={img3} head="Payment" desc="We’d love to talk about how we can work together" />
                </div>
            </div>
            <br /><br />
            <div className="about_work d-flex justify-evenly">
                <div className="rightSideImg d-flex justify-center items-center">
                    <img src={img4} alt="" />
                </div>
                <div className="leftSide">
                    <div className="left_head">
                        <h2>We work <br />worldwide.</h2>
                    </div>
                    <div className="workLoc flex flex-wrap items-center justify-between">
                        <WorkLoc country="India " address="Gachibowli" city="Hyderabad" pin="500032" />
                        <WorkLoc country="London" address="508 Oxford Street" city="United Kingdom" pin="10022" />
                        <WorkLoc country="India " address="Bangalore " city="Karnataka" pin="560001" />
                        <WorkLoc country="Paris" address="508 Bridle Avenue" city="Newnan, GA" pin="30263" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contactform;
