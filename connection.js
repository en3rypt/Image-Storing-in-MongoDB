var mongoose = require('mongoose');
// var img = require('./img');

const connection = function(){
    mongoose.connect('mongodb://localhost/testImage');
    console.log('connected to mongodb');
}
module.exports = connection;