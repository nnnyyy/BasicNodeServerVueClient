var debug = require('debug')('backend:server');

exports.isAuth = function(req, res, next) {
    debug('isAuth middleware', req.isAuthenticated())
    if( req.isAuthenticated() ) {
        next()
    }
    else {
        res.send({err: -99, errmsg: 'access denied'})
    }
}