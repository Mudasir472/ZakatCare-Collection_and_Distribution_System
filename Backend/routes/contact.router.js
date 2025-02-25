const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");

const contactController = require('../controllers/contact.controller');



router.post("/zakatcare/contact",  wrapAsync(contactController.contactPost));

router.get("/zakatcare/contact",  wrapAsync(contactController.contactGet));

module.exports = router;
