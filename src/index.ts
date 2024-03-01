import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookeiParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

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
