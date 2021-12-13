const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('userName', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { userName, email, password } = req.body;

    try {
        //Check if there is user with this email
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
        }

        //Create a new user
        user = new User({
            userName,
            email,
            password
        });

        //BCrypt Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //Save User
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            user.save().then(
                res.status(200).json({ msg: 'User added successfully.', token })
            ).catch(err => console.error(err.message));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Something wrong!!!' })
    }

})

module.exports = router;