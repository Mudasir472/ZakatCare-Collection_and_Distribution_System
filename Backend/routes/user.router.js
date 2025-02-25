const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync")
const authenticate = require("../Middlewares/authenticate")
const userController = require('../controllers/user.controller')

const { storage } = require("../cloudConfig");
const multer = require('multer');
const Team = require("../modals/team.modal");
// const zakatcare = require("../modals/data.modal");
const upload = multer({ storage });

//user router
router.post("/zakatcare/login", userController.login);

router.post("/zakatcare/signup", userController.signup)


router.post("/zakatcare/logout", authenticate, userController.logout)

router.get("/zakatcare/profile", userController.profile)


router.put("/zakatcare/updateuser/:id", authenticate, userController.updateUser)

router.post("/zakatcare/changeprofile", authenticate, upload.single("profilePic"), wrapAsync(userController.changeProfile));

router.get("/zakatcare/teammembers", wrapAsync(async (req, res) => {
    const indexData = await Team.find({});
    res.send(indexData);
}))

module.exports = router;

