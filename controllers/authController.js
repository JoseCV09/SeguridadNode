const { response } = require("express")
const { Pool } = require('pg');
const { database } = require('../database/connect');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const pool = new Pool(database);

const login = async(req, res = response) => {
    const { usuario, password } = req.body;
    try {
        
        const data_usuario = await pool.query(`SELECT usuario.idusuario, usuario.usuario, usuario.password, rol.nomrol FROM usuario, rol WHERE usuario.idrol = rol.idrol AND usuario.usuario=$1`,[usuario])
        if(data_usuario.rows.length===0){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario Incorrecto.!'
            })
        }
        console.log(data_usuario.rows);
        // Validar passwords
        const validPassword = bcrypt.compareSync(password, data_usuario.rows[0].password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contrasena no valida'
            });
        }

        // Generar JWT
        const token = await generarJWT(data_usuario.rows[0].idusuario, data_usuario.rows[0].usuario, data_usuario.rows[0].nomrol);

        res.status(200).json({
            ok: true,
            msg: 'Bienvenido a la app.!',
            token
        })



    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal.!'
        })
    }
}


const createUser = async(req, res = response) => {
    
    const { usuario, password, idrol } = req.body;

    try {

        const data_usuarios = await pool.query(`SELECT * FROM usuario WHERE usuario=$1`, [usuario])
        
        if(data_usuarios.rows.length>0){
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario ya existe.!'
            })
        }

        
        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        const password_encrypt = bcrypt.hashSync(password, salt);

        await pool.query(`INSERT INTO usuario(usuario, password, estado, idrol) values($1, $2, 1, $3)`,
        [usuario, password_encrypt, idrol])
        
        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado correctamente.!'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal.!'
        })
    }

}


module.exports = {
    login,
    createUser
}