import {Server} from 'socket.io'

// interface ServerToClientEvents {
//     noArg: () => void;
//     basicEmit: (a: number, b: string, c: Buffer) => void;
//     withAck: (d: string, callback: (e: number) => void) => void;
// }
//
// interface ClientToServerEvents {
//     hello: () => void;
// }
//
// interface InterServerEvents {
//     ping: () => void;
// }
//
// interface SocketData {
//     name: string;
//     age: number;
// }

const socketServer = (httpServer) => {
    return new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });
}

export default socketServer
