const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query:{
        async getUsers() {
            try{
                const users = await User.find();
                return users;
            }catch(err){
                throw new err(err);
            }
        }
    },
    Mutation: {
        async register(_, { registerInput: { username, password, email, confirmPassword, last } }) {
            console.log(last);
            // Check if user with email and username exists 
            const user = await User.findOne({ username });
            
            if(user){
                throw new UserInputError('User with entered username exist!', {
                    errors:{
                        username: 'This username is taken.'
                    }
                });
            }

            // Hash password
            password = await bcrypt.hash(password, 12);

            // Save user
            const newUser = User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            // Create token
            const token = jwt.sign({
                email,
                username,
                password
            }, SECRET_KEY, { expiresIn: '1h' });

            // Return response to frontend
            return {
                ...res._doc,
                id: res._id,
                token,
                test:"testing server"
            }
        }
    }
}