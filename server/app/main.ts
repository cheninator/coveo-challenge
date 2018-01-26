import { Server } from './server';
import * as http from 'http';

const port = "3000";
let server = new Server(port);


let httpServer: http.Server;
httpServer = http.createServer(server.app);

httpServer.listen(port);

httpServer.on("error", (error: NodeJS.ErrnoException) => {
    if (error.syscall !== "listen") { 
        throw error; 
    }
    
    let bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

httpServer.on("listening", () => {
    let addr = httpServer.address();
    let bind: string = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
});