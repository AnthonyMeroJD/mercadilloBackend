//en este archivo debo hacer uso de squalize 
//y dar configuracion de la base de datos 
import Sequalize from 'sequelize';
/*@params
nombre de la base de datos
user 
pass 
objeto de config */
const db=new Sequalize('mercadillo','root','root',{
 host:'127.0.1',
 port:'3306',
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