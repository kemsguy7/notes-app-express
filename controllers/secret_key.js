const crypto = require('crypto');

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    console.log('Generated Secret Key:', JWT_SECRET_KEY);
};

generateSecretKey();
