const express = require('express');
const striptags = require('striptags')
const hbs = require('hbs')
//const hbs = require('express-handlebars')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash')
const mongoose = require('mongoose')
const app = express()

// set locat variable




// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs')
//app.engine('hbs',hbs({extname:'hbs'}))
app.set('view engine', 'hbs')

hbs.registerPartials("views/backend/common")
hbs.registerPartials("views/frontent/common")

dotenv.config({path:'./config.env'})
app.use(express.static(__dirname+'/public/'))
 app.use(bodyParser.urlencoded({extended:true}))

app.use(methodOverride('_method'))
mongoose.connect(process.env.mongoUrl)



app.use(session({
    secret:'nodejs',
    resave:true,
    saveUninitialized:true
}))
app.use(flash())

let pagemodel = require('./models/pageModel')
let productModel = require('./models/productModel')
let catModel = require('./models/categorymodel')







app.use((req, res, next)=>{
    res.locals.success = req.flash('success') 
    res.locals.err = req.flash('err')
    //Note: yahan 'sucess' & 'err' globaly message set kiya jaa raha hai jiska use puer application men kahin bhi kiya jaa sakta hai    
    
    //PASS PAGE DATA TO ALL FRONTENT HEADER
    pagemodel.find({})
        .then((navdata) => {
            res.locals.navdata = navdata; 
           
           })


        .catch((y) => {
           // console.log(y)
        })
        hbs.registerHelper("log", function(allcourses){
           // console.log(allcourses)
          });
    // PASS ALL COURSERS LIST TO ALL COURESE PAGES
        productModel.find()
        .then((x)=>{
            res.locals.allcourses = x;   
        })
    //     catModel.find({} )
    //    .select({categoryPhoto:1})
    //     .then((x=>{
    //         res.locals.allcourses1 = x;  
    //     console.log(x)  
    //     })
        
    //PASS ALL CATEGORY DATA ANY WHERE
    catModel.find()
    .then((x)=>{
        res.locals.allcat = x;
       // console.log(x[1].category) 
       // console.log(res.locals.allcat[1].category) 
    }) 
  
    next()
 })



 

 hbs.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,5);
    return new hbs.SafeString(theString)
});

hbs.registerHelper('carddetail', function(passedString) {
    var theString = passedString.substring(0,150);
    return new hbs.SafeString(theString)
});

//===========BACKEND ROUTER START HERE

let admin = require('./router/backend/admin')
 let adminpages = require('./router/backend/admin-page')
 let admincategory = require('./router/backend/admin-category')
 let adminproducts = require('./router/backend/admin-products')


// // set router

  app.use('/admin/', admin) // route admin
 app.use('/admin/pages/', adminpages) // top navigation like (home, about, contact,)
 app.use('/admin/category/', admincategory) //for category like (Java Script, NodeJs, Mongodb)
 app.use('/admin/products/', adminproducts) //for product like ( javascript related all topic || nodejs related All topic..)




// //BACKEND ROUTER END HERE
let pages = require('./router/frontent/page')
 let course = require('./router/frontent/product')



const userRoute = require('./router/userRoute');

app.use('/',userRoute);
 app.use('/course', course) 
// app.use('/course/Goldpackege', course) 
 app.use('/', pages) 

//for user routes


app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT, 'Port Working')
})
