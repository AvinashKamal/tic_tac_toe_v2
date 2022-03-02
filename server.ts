import app from './app';
import * as http from "http";
import {Server} from "socket.io";
import socketServer from "./socket";

const normalizePort = (val: string) => {
    let port: number = parseInt(val, 10)

    if(isNaN(port)) return val

    if(port >= 0) return port

    return false;
}

const onError = (error) => {
    if(error.syscall !== "listen") throw error

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    let address = server.address();
    // let bind = typeof address === "string" ? "pipe " + address : "port " + address.port;
    console.log("Server Running on Port: ", port);
}

let port = normalizePort(process.env.PORT || "9000")

app.set('port', port)

let server = http.createServer(app)

const io = socketServer(server)

io.on('connection', (socket) => {
    console.log(socket.id);
})

server.listen(port)
server.on('error', onError)
server.on("listening", onListening);


