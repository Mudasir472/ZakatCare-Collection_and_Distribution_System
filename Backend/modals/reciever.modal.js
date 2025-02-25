const mongoose = require('mongoose');
const { Schema } = mongoose;

const recieverSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        trim: true,
        lowercase: true,
    },
    about: {
        type: String,
        required: [true, 'about is required'],

    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    pincode: {
        type: String, // Changed to String to accommodate various formats
        required: [true, 'Pincode is required'],
        match: [/^\d{6}$/, 'Pincode must be a 6-digit number'], // Regex for validation
    },

    category: {
        type: String,
        required: [true, 'Donation category is required'],
        enum: {
            values: ['Education', 'Relief', 'Marriage', 'Feeding the Poor'],
        },
    },
    aadhar: { // Added field for Aadhar Number
        type: Number,
        required: [true, 'Aadhar number is required'],
    },
    bankOwner: {
        type: String,
        required: true
    },
    account: {
        type: Number,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    certificates: [{
        type: String,
    }],
    uploadAdhaar: {
        type: String,
        // required:true
    },
    status: {
        type: String,
        enum: {
            values: ['Pending', 'Approved', 'Rejected'],
        },
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: {
            values: ['Done', 'Pending'],
            default: 'Pending'
        },
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Reciever = mongoose.model('Reciever', recieverSchema);
module.exports = Reciever;
