//setup express server
const express = require('express');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path');
const upload = require('./routes/upload');
const connection = require('./connection')
const app = express();

connection();

const conn =mongoose.connection;
let gfs, gridfsBucket;
conn.once('open', () => {
      
   gfs = Grid(conn.db, mongoose.mongo);
   gfs.collection('photos');
   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos'
    });
})

app.use('/file',upload);
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//media routes
app.get('/file/:filename', async (req,res)=>{
    console.log(req.params.filename);
    try{
        const file = await gfs.files.findOne({filename:req.params.filename});
        console.log(file);   
        // const readStream = gfs.createReadStream(file.filename);
        const readStream = gridfsBucket.openDownloadStreamByName(file.filename)
        readStream.pipe(res);
    }catch(error){
        console.log(error);
        res.send('not found!!');
    }
}
);
app.delete('/file/:filename',async (req,res)=>{
    try{
        await gfs.files.deleteOne({filename:req.params.filename});
        res.send('success');
    }catch(error){
        console.log(error);
        res.send('error occoured');
        
    }
});

app.listen('8080',console.log('listening on port 8080'));