import express from 'express';
import { crearAnuncio,editarAnuncio } from '../controlers/Anuncios.js';
import { crearComentario,editarComentario } from '../controlers/Comentarios.js';
import {anuncios,anuncioCategorizado,
        anunciosForTitulo,comentariosByAnuncio,
        getAnuncios,getAnuncioByPk,
        validarUsuario} from '../controlers/index.js'
import { createUser,editarUser } from '../controlers/User.js';
const router = express.Router();
router.get("/anuncios",getAnuncios);
router.get("/anuncios/:anuncioId",getAnuncioByPk);
router.get("/anuncios/titulo/:titulo",anunciosForTitulo);
router.get("/anuncios/usuario/:userId",anuncios);
router.get("/anuncios/categoria/:categoria",anuncioCategorizado);
router.get("/comentarios/:anuncioId",comentariosByAnuncio);
router.get("/usuario/:nick/:password",validarUsuario);
router.post("/nuevoAnuncio",crearAnuncio);
router.put("/editarAnuncio",editarAnuncio);
router.post("/nuevoUser",createUser);
router.put("/editarUser",editarUser);
router.post("/nuevoComentario",crearComentario);
router.put("/editarComentario",editarComentario)
export default router;