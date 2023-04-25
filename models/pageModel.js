let mongoose = require('mongoose');
let pagSchema = mongoose.Schema({
    PageNo:Number,
    pageUrl : String,
    pageNavText : String,
    pageTitle : String,
    pageMetaDescrition : String,
    pageMetaKeyword : String,
    pageHeading : String,
    pagePhoto : String,
    PageDetails : String
})

let pageModel = mongoose.model('tables', pagSchema)

module.exports = pageModel