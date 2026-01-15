import { Server } from './config';
import express from 'express';
import appRouter from './routes';

(async () => {
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());
    server.use(appRouter);
}
