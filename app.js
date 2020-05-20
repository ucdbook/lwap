var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const approutes = require('./modules');

var app = express();
app.port = process.env.PORT || 3000;

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/favicon.png'));

app.use(logger('dev'));
app.use(bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: /http:*/,
    credentials: true
}));

approutes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
