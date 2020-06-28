var express = require('express');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '5000';
app.set('port', port);
var indexRouter = require('./routes')

// http.createServer(app)

// app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)

// if (process.env.NOVE_ENV === 'production') {
//     app.use(express.static('build'));
//     app.get('./*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//     })
// }

app.listen(port, () => console.log(" server is running on port ", port));
