import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { gracefulShutdown } from './die.mjs';
import { readFileSync } from "fs";
import { createServer } from "https";
import { SERVER_PORT, USE_HTTPS } from "./config.mjs";
import morgan from 'morgan';
import { handleCPU } from './cpu.mjs';
import { handleUser } from './user.mjs';
import { handleEnv } from './environment.mjs';
import { handleDocker } from './docker.mjs';
import { handleDir } from './dir.mjs';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Load SSL certificates
const certPath = './src';
const httpsServerOptions = {
    key: readFileSync(`${certPath}/localhost.key`),
    cert: readFileSync(`${certPath}/localhost.crt`),
};

app.get("/", (req, res) => res.json("hello world!"));
app.options('*', cors());
// Router handler for /cpu
handleCPU(app);
handleUser(app);
handleEnv(app);
handleDocker(app);
handleDir(app);

const host_protocol = USE_HTTPS ? "https" : "http";

createServer(httpsServerOptions, app).listen(SERVER_PORT, () => {
    console.log(`Server running on ${host_protocol}://localhost:${SERVER_PORT}`);
});


process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
