const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '' ) => {
    
    const payload = { uid };
    return token = jwt.sign(payload, process.env.SECRETORPRIVATEKEY);
}

module.exports = {
    generarJWT
}

