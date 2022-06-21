const {check, validationResult} = require('express-validator');
const promise = require("../utils/promise");

exports.validateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('birthDate')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Birthdate can not be empty!')
        .bail()
        .isISO8601('yyyy-mm-dd')
        .withMessage('Invalid email birthDate. Format must by yyyy-mm-dd!')
        .bail(),
    check('address')
        .not()
        .isEmpty()
        .withMessage('Address can not be empty!')
        .bail(),
    check('address.street')
        .not()
        .isEmpty()
        .withMessage('Street can not be empty!')
        .bail(),
    check('address.state')
        .not()
        .isEmpty()
        .withMessage('State can not be empty!')
        .bail(),
    check('address.city')
        .not()
        .isEmpty()
        .withMessage('City can not be empty!')
        .bail(),
    check('address.country')
        .not()
        .isEmpty()
        .withMessage('Country can not be empty!')
        .bail(),
    check('address.zip')
        .not()
        .isEmpty()
        .withMessage('Zip can not be empty!')
        .isPostalCode("ES")
        .withMessage('Invalid Spain zip!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];