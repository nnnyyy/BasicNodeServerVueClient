const configFile = require('../config/MYSQLConf.json');
const sql = require('mysql');

class MYSQLHelper {
    constructor() {
    }

    init() {
        return new Promise(res => {
            this.mPools = new Map();
            for (const idx in configFile) {
                const config = configFile[idx];
                this.connectPool(config);
            }
            res();
        })
    }

    connectPool(config) {
        const pool = sql.createPool({
            connectionLimit: (config.connectionLimit || 60),
            host: config.server,
            user: config.user,
            password: config.password,
            database: config.database,
            multipleStatements: true
        });

        this.mPools.set(config.alias, pool);
    }

    pm_getConnection(dbalias) {
        return new Promise((res, rej) => {

            const _pool = this.mPools.get(dbalias);
            if (!_pool) {
                rej(err);
                return;
            }

            _pool.getConnection((err, conn) => {
                if (err) {
                    //conn.release();
                    rej(err);
                }
                else {
                    res(conn);
                }
            });
        });
    }

    query(dbalias, query, cb) {
        try {
            this.pm_getConnection(dbalias)
                .then(conn => {
                    conn.query(query, (err, rows) => {
                        conn.release();
                        if (cb) cb(rows, err);
                    })
                });
        } catch (e) {
            cb(null, e);
        }
    }

    query2(dbalias, query) {
        return new Promise((res, rej) => {
            try {
                this.pm_getConnection(dbalias)
                    .then(conn => {
                        conn.query(query, (err, rows) => {
                            conn.release();
                            res({ rows: rows, err: err })
                        })
                    });
            } catch (e) {
                res({ rows: null, err: e });
            }
        })
    }

    beginTran(dbalias) {
        return new Promise(async (res, rej) => {
            let conn = await this.pm_getConnection(dbalias);
            conn.beginTransaction(err => {
                if (err) conn.rollback();
                res(err)
            })
        })
    }

    rollback(dbalias) {
        return new Promise(async (res, rej) => {
            let conn = await this.pm_getConnection(dbalias);
            conn.rollback();
            res();
        })
    }

    endTran(dbalias) {
        return new Promise(async (res, rej) => {
            let conn = await this.pm_getConnection(dbalias);
            conn.commit(err => {
                if (err) conn.rollback();
                res(err)
            })
        })
    }

    proc(dbalias, spname, aInputParams, cb) {
        try {
            let paramQ = '';
            for (let i = 0; i < aInputParams.length; ++i) {
                paramQ += '?';
                if (i + 1 < params.length) {
                    paramQ += ',';
                }
            }

            this.pm_getConnection(dbalias)
                .then(conn => {
                    conn.query(`CALL ${spname}(${paramQ})`, aInputParams, function (err, rows) {
                        conn.release();
                        if (cb) cb(rows, err);
                    });
                });
        } catch (e) {
            cb(null, e);
        }
    }
}

helper = new MYSQLHelper();

module.exports = helper;