import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path';

const allowedFileType = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null,'./public/resources/uploads')
    },

    filename(req, file, cb) {
        crypto.randomBytes(16, function(err, raw){
            if(err) return cb(null, err.message);
    
            const ext = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + raw.toString('hex') + ext)
        })
    },


})

export const uploads = multer({
    storage,
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname);

        if(allowedFileType.includes(ext)){
            cb(null, true)
        }else{
            cb(new Error('File type is not allowed' + ext))
        }
    },

    limits : {
        fileSize : 1024 * 1024 * 2
    }
})
