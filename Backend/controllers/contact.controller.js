const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const Contact = require('../modals/Contact.modal');
const wrapAsync = require("../utils/wrapAsync");

const uniqueToken = uuidv4();
// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "bhatmuddu472@gmail.com",
        pass: "iqdr riqu qsna wpct",
    },
});
module.exports.contactPost = async (req, res) => {

    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ msg: "All fields are required." });
    }
    try {
        const contactData = new Contact({ name, email, phone, message });
        await contactData.save(); // Wait for the save operation
        const mailOptions = {
            to: email,
            from: 'bhatmuddu472@gmail.com',
            subject: 'Fill all details',
            text: `
                You are receiving this because you have contacted ZakatCare for assistance.\n\n
                Please click on the following link, or paste it into your browser to complete the process of providing detailed information and uploading the required documents: \n\n
                http://localhost:5173/reciever-details/${uniqueToken}\n\n
                If you did not request this, please ignore this email.\n
                Thank you for reaching out to ZakatCare.
`
        };

        const info = await transporter.sendMail(mailOptions, (err) => {
            if (err) return res.status(500).json({ message: 'Error sending email.' });
            return res.status(200).json({ message: 'Thanks , Email has been sent' });
        });
    } catch (error) {
        console.error('Error saving contact data:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports.contactGet = async (req, res) => {
    try {
        const allContacts = await Contact.distinct("phone");
        const contacts = await Contact.find({});
        res.status(200).json({ contacts, allContacts });
    } catch (error) {
        console.error('Error fetching contact data:', error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}