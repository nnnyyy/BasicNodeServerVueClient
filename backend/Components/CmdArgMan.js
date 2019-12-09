class CmdArgMan {
    constructor() {        
        process.env.NODE_ENV = 'production'
        var valBefore = '';
        process.argv.forEach(val=> {
            if(val == '-dev') process.env.NODE_ENV = 'development'
            if(val == 'debuglog') process.env.DEBUG = '*'
            if(valBefore == '-p') this.PORT = Number(val);
            valBefore = val;
        })
    }
}

cam = new CmdArgMan();

module.exports = cam;