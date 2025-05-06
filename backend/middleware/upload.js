const multer = require('multer');
const path = require('path');

// Guardar archivos en public/uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ruta absoluta desde la raíz del proyecto (yugioh-shop)
        const uploadPath = path.resolve(__dirname, '../public/uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

module.exports = multer({ storage, fileFilter });

