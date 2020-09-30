import io from "socket.io-client";

const SERVER_SOCKET = process.env && process.env.VUE_APP_SOCKET;

export default class Socket {

    static connect() {
        this.socket = io.connect(
            SERVER_SOCKET,
            {
                transports: ['websocket']
            }
        );
        this.on('connect', (socket) => {
            console.log('connect socket success', socket);
        });
    }

    static on(key, listener) {
        this.socket.on(key, listener);
    }

    static post(key, data, listener) {
        this.socket.post(key, data, listener);
    }

    static off(key, listener) {
        this.socket.off(key, listener);
    }

    static close() {
        console.log('socket close');
        if (this.socket) this.socket.disconnect();
    }
}