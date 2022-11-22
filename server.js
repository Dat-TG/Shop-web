const hbs = require('express-handlebars')
const express = require('express')
const path = require('path');
const { urlencoded } = require('express');
const app = express()
const port = 3000

//Create database and execute sql script if database not exists
const database = require('./model/createDatabase.m');
database.isExists().then(isExist=>{
    console.log(isExist);
    if (!isExist) {
        database.create();
    }
    else {
        console.log('Database exists');
    }
})

//Router
const RegisterRouter = require('./routers/register.r');
const LoginRouter = require('./routers/login.r');

//Use static resources
app.use(express.static(path.join(__dirname, '/public')))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//Template engine
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: [
        path.join(__dirname, '/views/partials')
    ]
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))


//const res=require('./model/Categories.m');
//var result=res.getAll();
//console.log(result);


app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);

app.use('/', (req, res, next) => {
    res.send('home');
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})