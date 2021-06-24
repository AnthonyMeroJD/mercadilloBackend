import { User } from "../models/User.js";
import { someElementEmpy } from "../utils/index.js";


const editarUser=async(req,res)=>{
    const {id,nick,password,cod_pais,celular}=req.body;
    const areFieldsEmpy=someElementEmpy(id);
    if (!areFieldsEmpy) {
        const user=await User.update({nick,password,cod_pais,celular},{where:{id}})
        if (user) {
            res.json({staus:'ok'});
        }else{
            res.json({staus:'error'});
        }
    }
}

const createUser= async(req,res)=>{
    const {nick,password,cod_pais,celular}=req.body;
    const areFieldsEmpy=someElementEmpy(nick,password,cod_pais,celular);

    if (!areFieldsEmpy) {        
        try {
            const valoracion=1;
            const users=await User.findOne({where:{nick}});
            if (!users) {
                const user=await User.create({nick,password,cod_pais,celular,valoracion});
                user?res.json({staus:'ok',id:user.id}):res.json({staus:'error'});                
            }else{
                res.json({staus:'error'});
            }

        } catch (error) {
            res.json({staus:'error'})
        }    
    }
    
}

export {createUser,editarUser}