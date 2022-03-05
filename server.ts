import app from './app';
import * as http from "http";
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

let port = normalizePort(process.env.PORT || "8999")

app.set('port', port)

let server = http.createServer(app)

const io = socketServer(server)

let playerInfo : object = {}

let playersList : Array<object> = []

io.on('connection', (socket) => {

    socket.on("join room", async (userInfo) => {
        console.log("User info ", userInfo)
        socket.join(userInfo.roomId)
        playerInfo = {
            socketId: socket.id,
            playerName: userInfo.name,
            symbol: userInfo.symbol
        }
        console.log("Player info ", playerInfo)

        playersList.push(playerInfo)

        let roomMembers = Array.from(io.sockets.adapter.rooms.get(userInfo.roomId))
        if(roomMembers && roomMembers.length === 2) {
            console.log("Players List ", playersList)
            io.in(userInfo.roomId).emit("start game", {message: "Your game has started", playersList})
        }

    })



    // Disconnect all clients
    // let clients = io.sockets.sockets;
    // console.log("Clients ", clients.size)
    // clients.forEach((client) => {
    //     client.disconnect(true)
    // })
    socket.on("disconnect", (reason) => {
        console.log("Reason ", reason)
    });

})

// function getOpponent(socket) {
//     if (!players[socket.id].opponent) {
//         return;
//     }
//     return players[players[socket.id].opponent].socket;
// }


server.listen(port)
server.on('error', onError)
server.on("listening", onListening);


