const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcryptjs");
const jwtSecret = "Mynameismanishagharti$#";


router.post("/creatuser",
    body('email', 'incorrect email').isEmail(),
    body('name', 'character must be mininum 5').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const salt = await bcrypt.genSalt(10);
        let secPassword = bcrypt.hashSync(req.body.password, 10)      
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(response=>res.status(200).json({
                success:true, 
                result:response
            }))
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })
router.post("/loginuser",[
    body('email', 'incorrect email').isEmail(),
        body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

        let email = req.body.email;

        try {
            let userData    = await User.findOne({ email });
            console.log(req.body.password)
            if (!userData) {
                return res.status(400).json({ errors: "Incorrect Credentials" })


            }
            console.log(userData)
            const pwdCompare = bcrypt.compareSync(req.body.password , userData.password);
            // const pwdCompare = (req.body.password && userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect Password" })
            }
            const data ={
                user:{
                    id:userData.id
                }
            }

            const authToken =jwt.sign(data,jwtSecret)
            return res.json({ success: true , authToken:authToken, result:userData});
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })
module.exports = router;