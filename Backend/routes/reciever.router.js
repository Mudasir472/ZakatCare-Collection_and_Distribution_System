const express = require("express");
const router = express.Router({ mergeParams: true });
const Reciever = require("../modals/reciever.modal");
const revieverController = require('../controllers/reciever.controller')
const { storage } = require("../cloudConfig");
const multer = require('multer');
const upload = multer({ storage });

// Using multer middleware to handle multiple file uploads
router.post("/zakatcare/recieve-details", upload.fields([{ name: 'fileAadhar' }, { name: 'certificate' }]),  revieverController.recieverDetailsPost);

router.get('/zakatcare/recieve-details',revieverController.recieverDetailsGet)

router.post('/zakatcare/update-status', revieverController.updateStatus)

router.post('/zakatcare/payment-status', revieverController.paymentStatus)

module.exports = router;
