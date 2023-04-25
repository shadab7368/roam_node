let mongoose = require('mongoose');
let catSchema = mongoose.Schema({
    category:String,
    categoryTitle:String,
    categoryMeta:String,
    categoryDesc:String,
    categoryUrl:String,
    categoryDetails:String,
    categoryPhoto:String    
})


const catModel = mongoose.model('catTables', catSchema)

// const coll = db.collection('catTables');
// coll.count().then((count) => {
//     console.log(count);
// });


module.exports = catModel