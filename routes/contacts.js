const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error!');
    }
})

// @route   POST api/contacts
// @desc    POST a new contact
// @access  Private
router.post('/', [
    auth,
    check('userName', 'Please add a name').not().isEmpty(),
], async (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { userName, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            userName,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();
        res.status(200).json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error!');
    }
})

// @route   PUT api/contacts/:id
// @desc    Update Contact
// @access  Private
router.put('/:id', auth, async (req, res) => {

    const { userName, email, phone, type } = req.body;

    const contactObj = {};
    if (userName) contactObj.userName = userName;
    if (email) contactObj.email = email;
    if (phone) contactObj.phone = phone;
    if (type) contactObj.type = type;

    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }
        //Make sure user ows contacts
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized!!!' })
        }

        await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactObj },
            { new: true }
        ).then(
            res.status(200).json({ msg: 'Successful updated' })
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error!');
    }

})

// @route   DELETE api/contacts/:id
// @desc    Delete Contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ msg: 'Contact not found' })
        }
        if (contact.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id).then(
            res.status(200).json({ msg: 'Contact Deleted' })
        )
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }
})

module.exports = router;