const jwt = require('jsonwebtoken');

const generarJWT = (id_usuario, usuario, nomrol) =>{

    return new Promise( (resolve, reject) =>{

        const payload = {
            id_usuario,
            usuario,
            nomrol
        }
    
        jwt.sign(payload,process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(error);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        });
    })
    
}

module.exports = {
    generarJWT
}