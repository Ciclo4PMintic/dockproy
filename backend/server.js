
require('dotenv').config({path:"/config.env"})

const express =  require('express');
var MongoDBUtil = require('./config/mongodb/modules/mongodb/mongodb.module').MongoDBUtil;
const errorHandler=require('./middleware/error');
const createRoles=require('./lib/inicioSetup')
const path = require('path')
////connections
MongoDBUtil.init();

var app=express();
createRoles();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))

app.use('/api/home', require('./routes/home'))
app.use('/api/projects',require('./routes/project'))
app.use('/api/inscription', require('./routes/inscription'))
app.use('/api/advance', require('./routes/advance'))

////error handler last middleware
app.use(errorHandler)

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))

const PORT= process.env.PORT ||3001;

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));

module.exports= app;