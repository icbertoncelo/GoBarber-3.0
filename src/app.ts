import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import uploadConfig from './config/upload';

import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.derectory));
app.use(routes);

export default app;
