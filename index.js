
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import  { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";

import { commentRoutes } from './router/CommetsRouter.js';

const _PORT = PORT || 4173;
const app = express();
app.use(express.json());
app.use(cors({
        origin:['http://localhost:8100','https://filmblogapp.netlify.app'],
        methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));

app.use('/api', RouterUsuer);
app.use('/api',commentRoutes);

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

