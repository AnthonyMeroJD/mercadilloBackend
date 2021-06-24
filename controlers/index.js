

import {Anuncios} from '../models/Anuncios.js';
import { Categorias } from '../models/Categorias.js';
import { EstadoAnuncio } from '../models/Estado_Anuncio.js';
import { User } from '../models/User.js';
import Sequelize  from "sequelize";
import { Comentarios } from '../models/Comentarios.js';
const {Op}=Sequelize;

const formatComentarioDetalle=data=>{
    const format=data.map((e)=>{
        const {id,comentario,user}=e;
        const {nick}=user;
        return ({id,comentario,nick});    
    })     
    return format;
}

const  formatAnuncioDetalle=data=>{
     const {id,titulo,descripcion,categoria,user}=data;
     const {nick,cod_pais,celular}=user;
     const {nombre_categoria}=categoria || "";
     const formato={id,titulo,descripcion,
        nombre_categoria,vendedor:{nick,cod_pais,celular}};
     return  formato;
}

const formatAnuncioCardStyle=data=>{
    const formateado =data.map((carta)=>{
        const {id,titulo,descripcion,user,estadosAnuncio,categoria}=carta;           
        const {valoracion}=user||"";
        const {estado}=estadosAnuncio||"";
        const {nombre_categoria}=categoria||"";
        const formateado={id,titulo,descripcion,valoracion,estado,nombre_categoria};
        return formateado;
    });        
    return formateado;
}
const validarUsuario=async(req,res)=>{
    const {nick,password}=req.params;
    try {
        const user= await User.findOne({
            where:{nick:{
                [Op.eq]:nick
            },password:{
                [Op.eq]:password}}
        });
        if (user!=null && user.password===password) {            
                res.json({validate:true,id:user.id})    
        }else{
            res.json({validate:false})
        }
    } catch (error) {
        res.json({validate:false})
    }
}

const getAnuncioByPk=async(req,res)=>{
    const {anuncioId}=req.params;
    try {
        const anuncios=await Anuncios.findOne({
            where:{id:anuncioId},
            include:[User,Categorias]});        
        if (anuncios) {
            const format=formatAnuncioDetalle(anuncios);          
            res.json(format)    
        }              
    } catch (error) {
        res.json({data:"error"})
    }
}

const getAnuncios=async(req,res)=>{
    try {
        const anuncios=await Anuncios.findAll({include:[Categorias,User]});
        if (anuncios) {
            const anunciosFormateados=formatAnuncioCardStyle(anuncios);
            res.json(anunciosFormateados);
        }else{
            res.send("error");
        }
    } catch (error) {
        res.send("error");
    }
}

const anunciosForTitulo=async(req,res)=>{
    const {titulo}=req.params;
    try {
        
        const anuncios=await Anuncios.findAll({
            where:{
                titulo:{
                    [Op.substring]:titulo
                }
            }
        });   
        res.json(anuncios);
    } catch (error) {
        console.log(error);
    }
    
}

const anuncioCategorizado=async(req,res)=>{
    const {categoria}=req.params;
    try {     
    const categorias=await Categorias.findAll();
    console.log(categoria);
    const categoriasStr=JSON.stringify( categorias);
    const categoriasJson=JSON.parse(categoriasStr);
    const categoriaSeleccionada=categoriasJson.find(({nombre_categoria,id})=>
          nombre_categoria==categoria);
    const isValid=categoriaSeleccionada||false;  
    if (isValid) { 
        const anuncios=await Anuncios.findAll({
            where:{
                categoriaId:categoriaSeleccionada.id,
                estadosAnuncioId:1
            },
            include:[User,EstadoAnuncio,Categorias]
        })    
        const historicoJsonText=JSON.stringify(anuncios)
        const historico=JSON.parse(historicoJsonText);
        res.json(formatAnuncioCardStyle(historico));
    }else{
        res.redirect("http://localhost:4900/")
    }    
    } catch (error) {
        console.log(error);
    }
    
}

const anuncios=async(req,res)=>{
    const {userId}=req.params;    
    try {        
        const historicoAnuncios=await Anuncios.findAll({
            where:{
                userId:userId
            },include:[User,EstadoAnuncio,Categorias]
        });
        const historicoJsonText=JSON.stringify(historicoAnuncios)
        const historico=JSON.parse(historicoJsonText);
        res.json(formatAnuncioCardStyle(historico));
    } catch (error) {
        console.log(error);
    }
}



const comentariosByAnuncio=async(req,res)=>{
    const {anuncioId}=req.params;
    try {     
        const comentarios =await Comentarios.findAll({where:{
            anuncioId
        },include:[User]});   
        const format=formatComentarioDetalle(comentarios);
        res.json(format);
    } catch (error) {
        res.json({error});
    }

}

export {getAnuncios,anuncios,
        anuncioCategorizado,
        anunciosForTitulo,
         comentariosByAnuncio,
        validarUsuario,getAnuncioByPk}