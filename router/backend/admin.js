let express = require('express')
let productModel = require('../../models/productModel')
let catModel = require('../../models/categorymodel')
let pageModel = require('../../models/pageModel')
let router = express()

router.use((req, res, next)=>{

    catModel.find({}).count()
    .then((x)=>{
        res.locals.noofcat =x
    })


    pageModel.find({}).count()
    .then((x)=>{
        res.locals.noOfPage =x
    })


    next()
})

router.get('/', (req, res)=>{
    productModel.find({}).count()
    .then((noofcourse)=>{
        res.render('../views/backend/admin-File.hbs',{noofcourse})
    })
})




// router.use((req, res, next)=>{
  
//     next()

// })

module.exports = router