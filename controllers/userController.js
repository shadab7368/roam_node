const express=require("express")
const multer = require('multer');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const session = require("express-session");

const securePassword= async(password)=>{

    try {
           const passwordHash =  await bcrypt.hash(password,10);
        return passwordHash;
        } catch (error) {
         console.log(error.message);  
        }

}

const loadRegister = async(req,res)=>{
try {
    res.render('registration');
    
} 
catch (error)
 {
    console.log(error.message);
}

}

const insertUser = async(req,res)=>{
    try {
            const spassword = await securePassword(req.body.password);
           const user = new User({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mno,
                image:req.file.filename,
                password:spassword,
                is_admin:0
            })
            const userDate = await user.save()
            if (userDate){
                res.render('registration',{message:"your registratopn is success"});    
            }        
            else{
                res.render('registration',{message:"your registration has been failed"});

            }
    } 
    catch (error) {
         console.log(error.message);
    }
}

//login user methoed started
const loginLoad = async(req,res)=>{
try {
    res.render('login')
} catch (error) {
    console.log(error.message)    
}

}

const verifyLogin = async(req,res)=>{
try {
    const email=req.body.email;
    const password = req.body.password;
    
    const userData = await User.findOne({email:email})   
    if(userData){
      const passwordMatch = await bcrypt.compare(password,userData.password)
    if(passwordMatch){
        if(userData.is_verified===1){
            res.render('login',{message:"please verify your mail"})
        }
        else{
                // res.redirect('/home');
                req.session.user_id=userData._id;

                res.redirect('/admin');
        }

    }
    else{
        res.render('login',{message:"Email and password is Incorrect"});
    }
    }
    else{
        res.render('login',{message:"Email and password is Incorrect"});
    }



} catch (error) {
 console.log(error.message);   
}

}

const loadHome = async(req,res)=>{
try {
   //res.render('');
    //  res.render('home');
//   res.render('../frontent/index')
  res.render('../backend/admin-File')
} catch (error) {
   console.log(error.message); 
}


}
module.exports={
    loadRegister,
    insertUser   ,
    loginLoad,
    verifyLogin,
    loadHome
}