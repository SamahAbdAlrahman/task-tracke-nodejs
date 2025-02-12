import multer from 'multer';
import { nanoid } from 'nanoid'

function fileUpload(){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads') // callback
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + nanoid();
          cb(null, file.originalname + '-' + uniqueSuffix)
        }
      })
      
    //   function fileFilter(req, file, cb){
    //     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    //       cb(null, true);
    //     } else {
    //       cb("invalid format", false);
    //     }
    //   }
      const upload = multer({storage});
      return upload;
}

export default fileUpload;