const express= require("express")
const user_route= express();
const session = require("express-session");
// const config = require("../config/config");

const dotenv = require('dotenv').config()

 user_route.use(session({
    secret:process.env.sessionSecret,
    resave: false,
    saveUninitialized: true
}));
const auth= require("../middleware/auth");

user_route.set('view engine','hbs');
user_route.set('views','./views/users');
const bodyparser = require('body-parser');
user_route.use(bodyparser.json());

user_route.use(bodyparser.urlencoded({extended:true}));
const multer = require("multer");
const path = require("path");


const storeage= multer.diskStorage({
    destination:function(error,file,cb){
        cb(null,path.join(__dirname,'../public/images'));
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const upload = multer({storage:storeage})


const userController = require("../controllers/userController");


user_route.get('/register',auth.isLogout,userController.loadRegister);
user_route.post('/register',upload.single('image'),userController.insertUser);

user_route.get('../frontent/index',userController.loadHome);

user_route.get('/login',auth.isLogout,userController.loginLoad);
user_route.post('/login',userController.verifyLogin);



user_route.get('/admin',auth.isLogin,userController.loadHome);

// user_route.get('/admin',auth.isLogin,userController.loadHome);




module.exports = user_route;