const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '240h'
        }, ( err, token ) => {
    
            if( err ){
                reject( err );
            } else {
                resolve( token );
            }

        });
    });


};

module.exports = {
    generarJWT
};