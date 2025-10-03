const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        masLenght: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter proper email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter strong password");
            }
        }
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Please put valid gender!");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://picsum.photos/id/237/200/300",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Please pass proper image url");
            }
        }

    },
    about: {
        type: Array(String)
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;