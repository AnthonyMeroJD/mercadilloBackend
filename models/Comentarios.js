import db from '../config/db.js';
import Sequalize from 'sequelize';
import { User } from './User.js';
import { Anuncios } from './Anuncios.js';
export const Comentarios=db.define('comentarios',{
    comentario:{
        type:Sequalize.STRING        
    }
});
Anuncios.hasMany(Comentarios);
Comentarios.belongsTo(Anuncios);
User.hasMany(Comentarios);
Comentarios.belongsTo(User);