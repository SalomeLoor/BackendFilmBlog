import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import { RouterUsuer } from './router/UserRouter.js';
import { sequelize } from "./db/conexion.js";
import { commentRoutes } from './router/CommetsRouter.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());

// ✅ Configuración actualizada de CORS
app.use(cors({
    origin: [
        'http://localhost:8100',
        'https://filmblogapp.netlify.app',
        'https://filmblog-aabc5.web.app' // <-- este es el dominio de Firebase Hosting
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // si en algún momento usas cookies
}));

// ✅ Rutas
app.use('/api', RouterUsuer);
app.use('/api', commentRoutes);

// ✅ Inicializar
const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false });
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
};
main();
