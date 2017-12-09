// const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

app.get('/server', (req,res) => {
    res.send('Server on...');
});

let router = require('./routes/restapi.js');

// app.use(express.static(path.join(__dirname, '../public')))
//app.use('/',home);

app.use(express.static(path.join(__dirname, '../public')))
//app.use(cors());
app.use('/api/v1',router);
// app.use( (req,res,next) => {
// 	res.sendFile('index.html',{root: path.join(__dirname,'../public')});
// });

const server = require('http').Server(app);
server.listen(3030);
server.on('error', (err) => {
    throw err;
});
