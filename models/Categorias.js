import db from '../config/db.js';
import Sequalize from 'sequelize';
export const Categorias= db.define('categorias',{
    nombre_categoria:{
        type:Sequalize.STRING
    }    
})