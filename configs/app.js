'use strict';

//Importaciones
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';

import contactRoutes from '../src/contacts/contact.router.js';
import taskRoutes from '../src/tasks/task.router.js';


const BASE_URL = '/angendaKinAdmin/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }))
    app.use(express.json({ limit: '10mb' }))
    app.use(cors(corsOptions))
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use(`${BASE_URL}/contacts`, contactRoutes); 
    app.use(`${BASE_URL}/tasks`, taskRoutes); 

}


const initServer = async (app) => {
    app = express();
    const PORT = process.env.PORT || 3001;

    try {
        dbConnection();
        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json(
                {
                    status: 'ok',
                    service: 'agendaKin Admin',
                    version: '1.0.0'
                }
            );
        });

    } catch (error) {
        console.log(error)
    }
}

export { initServer };