//en este archivo debo hacer uso de squalize 
//y dar configuracion de la base de datos 
import Sequalize from 'sequelize';
import {PORT} from '../utils/index.js';
/*@params
nombre de la base de datos
user 
pass 
objeto de config */

const db=new Sequalize('heroku_f6d378fc6cb8b3c','ba5c256bfdc289','ba5c256bfdc289',{
 host:'us-cdbr-east-04.cleardb.com',
 port:{PORT},
 dialect:'mysql',
 define:{
  timestamps:false 
 },
 //configuracion de cuantos dispositivos estan permitiidos conectarse
 pool:{
  max:5,
  min:0,
  //el tiempo de espera minimo para tratar de conectarse si es que falla
  acquire:30000,
  idle:10000
 },
 operatorsAliases:0
});

export const syncDb=async ()=>{
    await db.sync({force:true})
}
export default db;