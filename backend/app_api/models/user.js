var mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

var user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    token: {
        type: String,
    }
});

user.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

user.methods.checkPassword = function (password) {
    hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
}

user.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

mongoose.model("user", user, "users");