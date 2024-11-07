const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT, 10) || 10;
    return await bcrypt.hash(password, saltRounds);
};

const validatePassword = async (password, hash) =>{
    return await bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    validatePassword
};