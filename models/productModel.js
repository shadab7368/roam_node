let mongoose = require('mongoose');
let pagSchema = mongoose.Schema({

    productCat:String,
    productCatUrl:String,
    productUrl :String,
    productNavText:String,
    productTitle:String,
    productMetaDescrition:String,
    productMetaKeyword:String,
    productHeading:String,
    productyoutube:String,
    productDetails:String



})


let productModel = mongoose.model('producttables', pagSchema)

module.exports = productModel