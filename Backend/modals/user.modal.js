const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const { Schema } = mongoose;
const key = "MySecretOkDontTouch"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
    ,
    image: {
        imgName: String,
        url: {
            type: String,
            default: "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
        },
        public_id:String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.methods.generateAuthToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, key, { expiresIn: '5d' })
        this.tokens = this.tokens.concat({ token: token })
        await this.save();

        return token;
    } catch (error) {
        console.log(error);
    }
}
const User = mongoose.model("User", userSchema);
module.exports = User;