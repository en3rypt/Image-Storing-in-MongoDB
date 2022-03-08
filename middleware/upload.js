const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const gridFsStream = require('gridfs-stream');

const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/testImage',
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }
        return{
            bucketName: 'photos',
            filename: `${Date.now()}-${file.originalname}`
        }
    }
});

module.exports = multer({storage});