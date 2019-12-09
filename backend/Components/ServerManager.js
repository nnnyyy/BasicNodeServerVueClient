const ioman = require('../Components/SocketIOManager');
const Log = require('../Components/Logger');


class ServerManager {
    constructor() {
        
    }

    async init(io) {
        this.io = io;
        this.io.on('connection', function(sock) {
            console.log('connect user - ' + sock)
        })

        try {
            await this.initSvrSettings();            
        }catch(e) {
            Log.error('server init error');
        }        

        setInterval(()=>{ this.update(new Date()); }, 400);
    }

    update(tCur) {
        //console.log(tCur);
    }

    initListener(io) {
        return new Promise((res,req)=> {                        
        })        
    }

    initSvrSettings(obj) {
        return new Promise((res,req)=> {            
            res();
        })                
    }
}

const _obj = new ServerManager();

module.exports = _obj;