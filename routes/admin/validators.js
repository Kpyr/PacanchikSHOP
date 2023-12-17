const usersStorage = require('../../storage/users.js');
const { check, validationResult } = require('express-validator');

module.exports = {
    checkEmail : check("email").trim().normalizeEmail().isEmail().custom(async email =>{
        const exists = await usersStorage.getOneBy({email}); 

        if(exists){
            throw new Error("Email already in use.");      
        }
    }),
    checkPassword : check("password").trim().isLength({ min : 2, max : 8}).withMessage("Password must be between 2 and 8 characters long."),
    checkTitle : check('title').trim().isLength({min: 5, max: 20}),
    checkPrice : check('price').toFloat().isFloat({min: 1}),
    checkExistingEmail : check('email').trim().normalizeEmail().isEmail().custom(async email => {
        const user = await usersStorage.getOneBy({email});

        if(!user){
            throw new Error("Email not found.");
        }
    }).withMessage("Email not found."),
    checkExistingPassword : check('password').trim().custom(async (password, { req }) => {
        const {email} = req.body;
        const user = await usersStorage.getOneBy({email});

        if(!user){
            throw new Error("Invalid password.");
        }

        if(!(await usersStorage.comparePasswords(password, user.password))){
            throw new Error("Invalid password.");
        }
    })
};