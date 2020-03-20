const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");


const schema = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required()
        .min(8)
});

module.exports = {

    /**
     * Returns a JWT token when a user gives a valid credential to authentication server. It's hard to retrieve a valid
     * token with invalid or inexitent credentials.
     * @param {*} request 
     * @param {*} response 
     */
    async login(request, response) {
        const { username, password } = request.body;

        const { error, value } = schema.validate({ username, password });

        if (error)
            return response
                .status(400)
                .json({
                    message: "Bad username or password",
                    details: {
                        error,
                        value
                    }
                });

        // Now checking if user is registered on database
        const user = await User.findOne({ username });

        if (!user)
            return response
                .status(404)
                .json({
                    message: "User password or username might be incorrect!!"
                });

        // Now checking if user password is correct (is valid)
        const valid = await bcrypt.compare(password, user.password);

        if (!valid)
            return response
                .status(403)
                .json({
                    message: "User password or username might be incorrect!"
                });

        // Signing a web token with valid credentials and private server's key
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        return response
            .status(200)
            .json({
                message: "Authenticated",
                token
            });
    },

    /**
     * Validate if a given JWT token is valid or not. A token is valid if it's previously generated and signed by
     * this server using user's ID
     * @param {*} request 
     * @param {*} response 
     */
    async validate(request, response) {
        return response
            .status(200)
            .json({
                message: "Not implemented..."
            });
    }
};
