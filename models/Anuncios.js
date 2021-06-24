import db from '../config/db.js';
import Sequalize from 'sequelize';
import { User } from './User.js';
import { Categorias } from './Categorias.js';
import { EstadoAnuncio } from './Estado_Anuncio.js';
export const Anuncios=db.define('anuncios',{
    titulo:{
        type:Sequalize.STRING,
    },descripcion:{
        type:Sequalize.STRING
    }
});
    
User.hasMany(Anuncios);
Anuncios.belongsTo(User);
Anuncios.belongsTo(Categorias);
EstadoAnuncio.hasMany(Anuncios);
Anuncios.belongsTo(EstadoAnuncio);

Categorias.hasMany(Anuncios);
Anuncios.belongsTo(Categorias);
EstadoAnuncio.hasMany(Anuncios);
Anuncios.belongsTo(EstadoAnuncio);