import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";

const allowedFileType = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./public/data/uploads");
    },
    filename(req, file, cb) {
      crypto.randomBytes(16, function (err, raw) {
        if (err) return cb(err, "");
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + raw.toString("hex") + ext);
      });
    },
  }),

  fileFilter(req, file, cb) {
   const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedFileType.includes(ext)) {
      return cb(null, true);
    } else {
      cb(null, false);
     cb(new Error('File type is not allowed ' + ext))
    }
  },

  limits : {
    fileSize : 1024 * 1024 * 2
  }
});

export default upload;
