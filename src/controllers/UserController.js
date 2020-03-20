const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const User = require("../model/User");


const schema = Joi.object({
    username: Joi.string()
        .required()
        .min(6),

    email: Joi.string()
        .required()
        .email(),

    password: Joi.string()
        .required()
        .min(6)
});

module.exports = {

    /**
     * Register a new user on database. A user must register a unique username and a unique email for each account
     * created. There's no way to create one or more user accounts with the same email or password.
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response) {
        const { username, email, password } = request.body;

        const { error, value } = schema.validate({ username, email, password });

        if (error)
            return response
                .status(400)
                .json({
                    message: "Something wrong with data sent by user.",
                    details: {
                        error,
                        value
                    }
                });

        // Checking if there's a user registered with given email or password
        let user = await User.findOne({
            username,
            email
        });

        if (user)
            return response
                .status(200)
                .json({
                    message: "Username or email already in use"
                });

        // Creating a hash for password. This is made for security reasons, like, avoid hackers to discover a user
        // password.
        const salt = await bcrypt.genSalt(5);

        // Hashing the password and store it on database
        const password_hash = await bcrypt.hash(password, salt);

        await User.create({
            username,
            email,
            password: password_hash
        });

        return response
            .status(201)
            .json({
                message: 'User created successfuly',
                user: {
                    username,
                    email
                }
            });
    }
};
