const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..', 'imgs'));
//     },
//     filename: (req, file, cb) => {
//         const fileName = `${Date.now()}_${file.originalname}`;
//         cb(null, fileName);
//     },
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };
