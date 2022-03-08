
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var imgShema = new Schema({
    name: String,
    desc:String,
    img:{
        data: Buffer,
        contentType: String
    }

});
console.log('shema created!');
module.export = new mongoose.model('img', imgShema);

