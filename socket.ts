import { Server } from 'socket.io'

const socketServer = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    })
    console.log(__dirname + "/apis/controllers/*.ts");

    return io;
}

export default socketServer
