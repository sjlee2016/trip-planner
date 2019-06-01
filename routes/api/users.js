const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const EmailToken = require('../../models/EmailToken');
const User = require('../../models/User');
var smtpTransport = require('nodemailer-smtp-transport');
const adminEmail = config.get('email'); 
const adminPassword = config.get('password'); 


// @route   get api / users
// @desc    Register user
// @access  public 
router.post('/register', [
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User already exists '
                }]
            });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password before saving to DB 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        var token = new EmailToken({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });

        // Save the verification token
        token.save(function (err) {
            if (err) {
                return res.status(500).send({
                    msg: err.message
                });
            }

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                  user: adminEmail,
                  pass: adminPassword
                }
              }));
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: '"Trip-Planner" <sjleesogang@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Please Verify Your Email For Trip-Planner ✔', // Subject line
                text: 'Hello,  ' + user.name +'\n\n' + ' Please verify your account by clicking the link: \nhttp:localhost:5000\/api\/verify' + '\/confirmation\/' + token.token + '.\n'
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        });

        // Json Web Token 
        jwt.sign(
            payload,
            config.get('jwtSecret'), {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;