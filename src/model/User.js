const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: String,  // Nome do usuário
    email: String,     // Email cadastrado no banco
    password: String   // O hash da senha informada pelo usuário
});

module.exports = mongoose.model('User', UserSchema);
