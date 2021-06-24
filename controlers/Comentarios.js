import { Comentarios } from '../models/Comentarios.js';
import { someElementEmpy } from '../utils/index.js';
const crearComentario =async(req,res)=>{
    const {comentario,anuncioId,userId}=req.body;
    const areFieldsEmpy=someElementEmpy(comentario,anuncioId,userId);
    if (!areFieldsEmpy) {
        try {            
            const comentarioObj =await Comentarios.create(
                {comentario,anuncioId,userId}) ;   
            if (comentarioObj) {
                res.json({status:"ok"});
            }else{
                res.json({status:"error"});
            }   
        } catch (error) {
            res.json({status:"error"});
        }
    }else{
        res.json({status:"error"})
    }   

}

const editarComentario=async(req,res)=>{
    const {id,comentario}=req.body;
    const areFieldsEmpy=someElementEmpy(comentario);    
    if (!areFieldsEmpy) {
        try {
            const comentarioObj=await Comentarios.update({comentario},{where:{id}});
            if (comentarioObj) {
                res.json({status:"ok"});
            }else{
                res.json({status:"error"});
            }
        } catch (error) {
            res.json({status:"error"});
        }
    }else{
        res.json({status:"error"});
    }
}

export {crearComentario,editarComentario}