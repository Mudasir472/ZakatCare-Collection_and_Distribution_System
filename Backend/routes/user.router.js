const express = require("express");
const passport = require("passport")
const router = express.Router({ mergeParams: true });
const User = require("../modals/user.modal");
const wrapAsync = require("../utils/wrapAsync")
const { isAuthenticated } = require("../Middlewares")

const { storage } = require("../cloudConfig");
const multer = require('multer');
// const Listing = require("../modals/data.modal");
const upload = multer({ storage });

router.post("/zakatcare/login", passport.authenticate('local'), wrapAsync(async (req, res) => {
    try {
        // Access the session ID on the server side
        const sessionId = req.sessionID;
        const user = req.user;
        // console.log(user)
        res.status(200).json({ message: "Login successful", redirectUrl: "/", user: req.user, sessionId });

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Login failed", redirectUrl: "/zakatcare/login", error: e.message });
    }
}));

router.post("/zakatcare/signup", async (req, res) => {
    try {

        const { name, email, username, password } = req.body;
        const newUser = new User({ name, username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                console.log('Login error after signup:', err);
                return res.status(500).json({ message: "Login after signup failed", redirectUrl: "/zakatcare/login" });
            }
            const sessionId = req.sessionID;
            res.status(200).json({ message: "Signup successful", redirectUrl: "/", sessionId });
            console.log('Signup successful');
        });

    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message, redirectUrl: "/zakatcare/signup", error: e.message });
    }
})

router.post("/zakatcare/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.send(err);
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Logout successful", redirectUrl: "/", });
    })
})

router.get("/zakatcare/profile", isAuthenticated, (req, res) => {
    res.status(200).json({ message: "user profile", user: req.user })
})
router.post("/zakatcare/changeprofile", isAuthenticated, upload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded" });
        }

        // Assuming req.user contains the logged-in user's information
        const userId = req.user._id;
        const filePath = req.file.path; // Path to the uploaded file

        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 'image.url': filePath }, // Update the image URL field; adjust field as per your schema
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: "Profile picture updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error uploading the file:', error);
        res.status(500).json({ message: "Failed to update profile picture", error: error.message });
    }
});

router.get("/zakatcare/getuser",(req,res)=>{
    res.status(200).json({ message: "user", user: req.user })
})
module.exports = router;

