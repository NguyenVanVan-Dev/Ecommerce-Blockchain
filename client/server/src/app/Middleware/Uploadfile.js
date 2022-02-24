const multer  = require('multer')
const path = require('path');
const   storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ 
    storage: storage,
    limits: { fieldSize:1000},
});
module.exports = upload;