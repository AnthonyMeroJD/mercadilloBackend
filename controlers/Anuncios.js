
import { Anuncios } from "../models/Anuncios.js";
import {someElementEmpy} from '../utils/index.js';
const crearAnuncio =async (req,res)=>{
    const {titulo,descripcion,
            userId,categoriaId,estadosAnuncioId}=req.body;
    const areFieldsEmpy=someElementEmpy(titulo,descripcion,userId,categoriaId,estadosAnuncioId);
        try {
            if (!areFieldsEmpy) {
                const anuncio=await Anuncios.create({
                    titulo,descripcion,estadosAnuncioId,userId,categoriaId,estadosAnuncioId
                });
                if (anuncio) {
                    res.json({status:"ok"});
                }else{
                    res.json({status:"error"});
                }
            }else{
                res.json({status:"error"});
            }
            

        } catch (error) {
            res.json({status:"error"});
        }   

}
const editarAnuncio=async (req,res)=>{
    const {id,titulo,descripcion,categoriaId,estadosAnuncioId}=req.body;
    const areFieldsEmpy=someElementEmpy(id);
    if (!areFieldsEmpy) {
        try {
            const anuncio=await Anuncios.update(
                {titulo,descripcion,categoriaId,estadosAnuncioId},{
                    where:{id}
                }
            )
            if (anuncio) {
                res.json({status:"ok"});
            }
        } catch (error) {
            res.json({status:"error"});
        }        
    }else{
        res.json({status:"error"});
    }
    
}
export {crearAnuncio,editarAnuncio}
 