const Reciever = require("../modals/reciever.modal");
const {recieverValidationSchema} = require("../SchemaValidation");
const ExpressError = require("../utils/customErrorHandle");
module.exports.recieverDetailsPost = async (req, res) => {
    try {
        // Extract and validate data from request body
        const { error } = recieverValidationSchema.validate(req.body);
        if (error) {
            console.log(error)
            // return res.status(400).json({ message: error.details[0].message, success: false });
            throw new ExpressError(400, error.details[0].message, false)
        }
        // Get the file information if uploaded
        const uploadAdhaar = req.files['fileAadhar'] ? req.files['fileAadhar'][0].path : null;
        const certificates = req.files['certificate'] ? req.files['certificate'][0].path : null;
        // const res = recieverValidationSchema.validate(req.body);
        // Create the new receiver record
        recieverValidationSchema.validate(req.body)
        const recieverData = new Reciever({
            ...req.body,
            certificates,// Store the aadhar file path
            uploadAdhaar, // Store the aadhar file path
        });
        await recieverData.save();
        res.status(200).json({
            message: "Details successfully recorded",
            success: true,
        });

    } catch (err) {
        // console.log(err);
        res.status(500).json({
            err: err.message || "An error occurred while saving details",
            success: false,
        });
    }
}
module.exports.recieverDetailsGet = async (req, res) => {
    try {
        const recieverData = await Reciever.find({})
        const totalRecievers = await Reciever.countDocuments({ paymentStatus: "Done" });
        res.status(200).json({
            recieverData,
            totalRecievers,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateStatus = await Reciever.findByIdAndUpdate(id, { status: status })
        if (updateStatus) {
            res.status(200).json({ message: 'Status updated successfully', updateStatus });
        } else {
            res.status(404).json({ message: 'Reciever not found' });
        }
        console.log(updateStatus)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports.paymentStatus = async (req, res) => {
    try {
        const { id, paymentStatus } = req.body;
        const updateStatus = await Reciever.findByIdAndUpdate(id, { paymentStatus: paymentStatus })
        if (updateStatus) {
            res.status(200).json({ message: 'paymentStatus updated successfully', updateStatus });
        } else {
            res.status(404).json({ message: 'Reciever not found' });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}