import Sequelize from 'sequelize';
import db from '../config/db.js';
export const User= db.define('user',{
    nick:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    valoracion:{
        type:Sequelize.INTEGER
    },
    cod_pais:{
        type:Sequelize.STRING
    },
    celular:{
        type:Sequelize.STRING
    }
});
