const socketio = require('socket.io');
const sharedsession = require("express-socket.io-session");

class SocketIOManager {
    constructor() {        
    }

    init(http, session) {
        this.io = socketio(http);
        this.io.use(sharedsession(session, {autoSave: true}));
    }
}

const _obj = new SocketIOManager();

module.exports = _obj;