var createError = require('http-errors');
var express = require('express');
var compression = require('compression');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/** App routers */
var indexRouter = require('./routes/index');
var welcomeRouter = require('./routes/welcome');
var authenticationRouter = require('./routes/authentication');
var masterIuranRouter = require('./routes/master-iuran');
var perumahanRouter = require('./routes/perumahan');
var pendudukRouter = require('./routes/penduduk');
var kolektorRouter = require('./routes/kolektor');
var penerimaanIuranRouter = require('./routes/penerimaan-iuran');
var reportPenerimaanIuranRouter = require('./routes/report-penerimaan-iuran');

/** App DB works */
var { sequelize } = require('./database/models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rewrite url to '/' if it's not API, images, css, or JS files
app.use(function (req, _res, next) {
    const isImageCssOrJSFile = /\.(jpg|jpeg|png|webp|avif|gif|css|js)$/.test(
        req.url
    );
    const isApiUrl = /^\/api\/*/.test(req.url);
    const isReportUrl = /^\/report\/*/.test(req.url);

    if (!isImageCssOrJSFile && !isApiUrl && !isReportUrl) {
        req.url = '/';
    }
    next();
});

// Test DB connection. Exit application if couldn't be established
sequelize
    .authenticate()
    .then(
        () =>
            void console.log(
                'Connection to database has been established successfully.'
            )
    )
    .catch((error) => {
        throw Error(error);
    });

// Main routes for web application
app.use('/', indexRouter);

// All API routes goes here
app.use('/api/welcome', welcomeRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api/master-iuran', masterIuranRouter);
app.use('/api/perumahan', perumahanRouter);
app.use('/api/penduduk', pendudukRouter);
app.use('/api/kolektor', kolektorRouter);
app.use('/api/penerimaan-iuran', penerimaanIuranRouter);

// All report routes for reporting
app.use('/report/penerimaan-iuran', reportPenerimaanIuranRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404));
});

app.use(compression());

// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
