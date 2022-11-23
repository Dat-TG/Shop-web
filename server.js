const hbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const path = require('path');
const { urlencoded } = require('express');
const app = express()
const port = 3000

//Create database and execute sql script if database not exists
const database = require('./model/createDatabase.m');
database.isExists().then(isExist => {
    console.log(isExist);
    if (!isExist) {
        database.create();
    }
    else {
        console.log('Database exists');
    }
})

//Use Session 
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret-key-123',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30*24*60*60*1000},
}))


//Router and model
const RegisterRouter = require('./routers/register.r');
const LoginRouter = require('./routers/login.r');
const catM=require('./model/Categories.m');
const proM=require('./model/product.m');
const CategoriesRouter=require('./routers/categories.r');

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
app.use('/Categories',CategoriesRouter);


app.use('/', async(req, res, next) => {
    //console.log(req.session.uid);
    if (req.session.uid) {
        const rs=await catM.getAll();
        var clist = rs.map((item)=>{
            return { CatID:item.CatID, CatName:item.CatName}
        });
        const rs1=await proM.getAll();
        var plist=rs1.map((item)=>{
            return {ProID:item.ProID, ProName:item.ProName, TinyDes:item.TinyDes, FullDes: item.FullDes, Price:item.Price, CatID:item.CatID, Quantity: item.Quantity};
        });
        var p3list=[];
        while (plist.length>0) {
            p3list.push(plist.splice(0, 3));
        }
        //console.log(p3list);
        res.render('home',{clist:clist, plist:p3list});
    } else {
        res.redirect('/login');
    }
});



app.use((err, req, res, next) => {
    const statusCode = err.statusCode | 500;
    res.status(statusCode).send(err.message);
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})