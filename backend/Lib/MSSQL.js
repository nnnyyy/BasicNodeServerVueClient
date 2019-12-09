const configFile = require('../config/MSSQLConf.json');
const sql = require('mssql');

class MSSQLHelper {
    constructor() {
        this.mPools = new Map();
    }

    async init() {
        for (const idx in configFile) {
            const config = configFile[idx];
            let pool = await new sql.ConnectionPool(config.conf).connect();
            const alias = config.alias ? config.alias : 'default';
            this.mPools.set(alias, pool);
        }

        try {
            let ret = await this.proc('testProc')
            console.log(ret)
        } catch (error) {
            console.log(error);
        }
    }

    query(query, dbid) {
        if (!dbid) dbid = 'default'

        return new Promise(async (res, rej) => {
            try {
                const _pool = this.mPools.get(dbid);
                let result = await _pool.request().query(query)
                res(result)
            } catch (error) {
                rej(error)
            }
        })
    }

    proc(spname, aInputParams, aOutputParams, dbid) {
        if (!dbid) dbid = 'default'

        return new Promise(async (res, rej) => {
            try {
                const _pool = this.mPools.get(dbid);
                const clientReq = _pool.request();
                let req = clientReq;

                if (aInputParams) {
                    for (var i = 0; i < aInputParams.length; ++i) {
                        const param = aInputParams[i];
                        req = req.input(param.name, param.value);
                    }
                }

                if (aOutputParams) {
                    for (var i = 0; i < aOutputParams.length; ++i) {
                        const param = aOutputParams[i];
                        req = req.output(param.name, param.value);
                    }
                }

                let result = await req.execute(spname);
                res(result);
            } catch (error) {
                rej(error)
            }
        })
    }
}

helper = new MSSQLHelper();
helper.init();

module.exports = helper;