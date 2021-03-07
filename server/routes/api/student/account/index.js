var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../../../model/index").Student;
const baseUrl = "https://techieegy.com";

router.post("/signup", async (req, res, next) => {
  let { password } = req.body;
  let data = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt
      .hash(password, salt)
      .then(async (hash) => {
        data.password = hash;
        try {
          const userToken = jwt.sign(
            { email: req.body.email },
            process.env.SECRET_KEY
          );
          data.token = userToken;
          data.isActive = true;
          const user = await User.create(data);
          return res.status(200).json({
            success: true,
            msg: "Account has been created!!",
            token: user.token,
            user,
          });
        } catch (err) {
          return res
            .status(409)
            .json({ success: true, msg: "Email already exists" });
        }
      })
      .catch((err) => {
        return res
          .status(409)
          .json({ success: true, msg: "Account already exists." });
      });
  });
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email: email })
    .then((result) => {
      if (result) {
        bcrypt
          .compare(password, result.password)
          .then((passwordResult) => {
            if (passwordResult === true) {
              let secretKey = process.env.SECRET_KEY;
              jwt.sign({ email: result.email }, secretKey, (err, token) => {
                if (err) {
                  console.log("jwt error", err);
                  next(err);
                } else {
                  User.findOneAndUpdate(
                    { email: result.email },
                    { token: token, isActive: true },
                    { new: true }
                  ).then(() => {
                    res.status(200).send({
                      success: true,
                      msg: "Login Successful",
                      token: token,
                    });
                  });
                }
              });
            } else {
              res
                .status(401)
                .json({ success: false, msg: "Incorrect Password" });
            }
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(401).json({ success: false, msg: "User not registered" });
      }
    })
    .catch((error) => {
      console.log("mongo error");
      next(error);
    });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Access denied" });
        return;
      } else {
        const data = await User.findOne({ email: decodedToken.email });
        if (data.token === token) {
          req.user = data;
          next();
        } else {
          res.status(401).json({ message: "Access denied" });
          return;
        }
      }
    });
  } else {
    res.status(401).json({ message: "Access denied" });
    return;
  }
}

router.get("/get/user/data", verifyToken, (req, res) => {
  const user = {
    ...req.user._doc,
    password: null,
  };
  res.status(200).send({ success: true, user: user });
});

router.post("/logout", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user.token === req.body.token) {
      const data = await User.findOneAndUpdate(
        { email: req.body.email },
        { isActive: false, token: "" },
        { new: true }
      );
      res.status(200).send({ success: true, message: "Logout successfull" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Token has been expired" });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: "Token has been expired" });
  }
});

module.exports = router;
