const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};

const signUp = async function (req, res) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
        }

        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save().then((newUser) => {
            createResponse(res, 201, newUser);
        });
    } catch (error) {
        console.error(error);
        createResponse(res, 400, { status: "Kayıt Başarısız!" });
    }
};

const login = async function (req, res) {

    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        createResponse(res, 400, { status: "Tüm Alanlar Gerekli!" });
        return;
    }

    passport.authenticate("local", (currentUser) => {
        if (currentUser) {
            let generateToken = currentUser.generateToken();
            createResponse(res, 200, { token: generateToken });
        } else {
            createResponse(res, 400, { status: "Kullanıcı adı ya da şifre hatalı" });
        }
    })(req, res);
};

module.exports = {
    signUp,
    login
};