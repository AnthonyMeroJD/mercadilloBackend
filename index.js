import express from 'express';
import cors from 'cors';
import db, { syncDb } from './config/db.js';

import router from './routes/index.js';
import { PORT } from './utils/index.js';

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const port=PORT;

//solo se puede enviar una respuesta 
//esta ees la manera de definir una ruta



app.use('/',router);

let s=app.listen(port,()=>{
    syncDb();
});
//s.close();