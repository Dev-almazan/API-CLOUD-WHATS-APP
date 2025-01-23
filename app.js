

import express from 'express';
import cors from 'cors';
import config  from './config.js';
import whatsAppRouter from './src/routes/whatsAppRouter.js';

const app = express();

//configuramos Middleware para los headers del api
app.use(cors({
    origin: config.envs.origin, 
    methods: config.envs.methods, // Permitir solo métodos GET y POST
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: config.envs.credentials 
}
))

//configuramos Middleware para el cuerpo de la peticion del api
app.use(express.json())

// Montamos enrutadores
app.use('/whatsapp/',whatsAppRouter);

// Iniciamos el servidor en el puerto especificado en la configuración
app.listen(config.envs.port, () => {
    console.log(`Servicio habilitado en puerto: ${config.envs.port}`)  
})
