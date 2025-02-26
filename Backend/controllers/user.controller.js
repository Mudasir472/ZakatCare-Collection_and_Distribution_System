const User = require("../modals/user.modal");
const passport = require("passport");
const ExpressError = require("../utils/customErrorHandle");
const wrapAsync = require("../utils/wrapAsync");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../cloudConfig");


module.exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    // console.log(req.body);

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ error: "Invalid Crediantials" });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = await existingUser.generateAuthToken();  //defined in user modal
        // Create token and set cookie

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true
        });

        const result = {
            existingUser,
            token
        }

        res.status(200).json({ message: "Login successful", result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

module.exports.signup = wrapAsync(async (req, res) => {
    const { name, email, password, role } = req.body;
    // Define a regex pattern to ensure the password contains at least one special character, one letter, and one number
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // Validate the password
    if (!passwordPattern.test(password)) {
        throw new ExpressError(400, "Password must contain at least one letter, one number, and one special character (@, $, !, %, *, #, ?, &).", false)
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "Email Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword,
        });

        await newUser.save();

        // Create token and set cookie
        const token = await newUser.generateAuthToken();  //defined in user modal

        // Create token and set cookie
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true,
            sameSite: 'none', // For cross-origin cookies
            secure: process.env.NODE_ENV === 'production'
        });

        // Return token and user data in the response
        const result = {
            user: newUser,
            token,
        };

        res.status(200).json({ message: "User created successfully", result });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currToken) => {
            return currToken.token !== req.token;
        });
        res.clearCookie('jwt', { path: "/" });
        await req.user.save();
        return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports.profile = wrapAsync(async (req, res) => {
    // By Hbbn

    const userId = req.user._id;
    if (!userId) {
        throw ExpressError(401, "Unauthorized Access", false)
    }

    const user = await User.findById(userId);

    if (!user) {
        throw ExpressError(404, "User not found", false);
    }
    return res.status(200).json({
        success: true,
        message: "User found",
        user
    })
})

module.exports.updateUser = async (req, res) => {
    // const {name,username,body}=req.body;
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { ...req.body })
    res.status(200).json({ msg: "user update success" });
}

module.exports.changeProfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(403).send({ message: "No file uploaded" });
        }

        // Assuming req.user contains the logged-in user's information
        const userId = req.user._id;
        const filePath = req.file.path; // Path to the uploaded file
        const public_id = req.file.filename

        // Here before update a new profile letus delete the previous from cloudinary
        const user = await User.findById(userId);
        const deletedPublic_id = user.image.public_id;
        if (deletedPublic_id) {
            await cloudinary.uploader.destroy(deletedPublic_id);
        }

        // Update the user's profile picture in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                image: {
                    imgName: req.file.originalname,
                    url: filePath,
                    public_id: public_id
                }
            },
            { new: true }
        );


        res.status(200).json({ message: "Profile picture updated successfully!", user: updatedUser });
    } catch (error) {
        console.error('Error uploading the file:', error);
        res.status(500).json({ message: "Failed to update profile picture", error: error.message });
    }
};