import db from '../config/db.js';
import Sequalize from 'sequelize';
export const EstadoAnuncio=db.define('estadosAnuncio',{
    estado:{
        type:Sequalize.STRING
    }
});