const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchusers');


// Router 1: to create a User
router.post('/create', [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "sorry this email already exist " })
            }

            const salt = await bcrypt.genSalt(10);
            const SecPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: SecPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, "JWT_SECRET_KEY")
            success = true;
            res.json({success, authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured")
        }
    })


// Router 2: to authenticate a User
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ errors: "Invalid email and password" });
        }

        const ComparePaaword = await bcrypt.compare(password, user.password);
        if (!ComparePaaword) {
            success = false;
            return res.status(400).json({success, errors: "Invalid email and password" });
        } else {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, "JWT_SECRET_KEY");
            success = true;
            res.json({success, authToken })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internnal server error")
    }
})


//Router 3: Get loggin User Details using Post

router.post('/getinfo', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Servre error");
    }
})




module.exports = router