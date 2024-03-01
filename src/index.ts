import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookeiParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';

import MONGO_URL from '../db.config';

const app = express();

app.use(cors({
   credentials: true
}));

app.use(compression());
app.use(cookeiParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080")
})


// const MONGO_URL = ""

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.error(error));
