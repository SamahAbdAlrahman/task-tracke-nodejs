import { Router } from "express";
import { UserModel } from "../../../DB/models/users.js"; 
import auth_admin from "../../middleware/auth_admin.js";
import {sendEmail} from "../../utils/sendEmail.js";
import fileUpload from "../../utils/multer.js";
import cloudinary from '../../utils/cloudinary.js';
const router = Router();


// if admin , can get all users id,name,email 
   router.get('/users',
    auth_admin(), 
   async (req, res) => {
    try {
   const user = await UserModel.findAll(
{    attributes: ['user_id', 'name', 'email'], 
  where: {
    role: 'user', 
  },
}
   );
      res.status(200).json(user);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed' });
    }
  });
  // if admin , can delete user by id 
 router.delete('/deleteUser/:idToDelete', auth_admin(),async (req, res) => {
    try {
      const { idToDelete } = req.params;
      
      const user = await UserModel.findOne({ where: {  user_id : idToDelete } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      await user.destroy(); 
      res.status(200).json({msg:"deleted done",name:user.name,email : user.email});
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  // Update
  // router.put('/updateUser/:id',auth_admin(), async (req, res) => {
  //   try {
  //     const { name } = req.body;
  //     const { id } = req.params;
  
  //     const user = await UserModel.findByPk(id); 
  
  //     if (user == null) {
  //       return res.status(404).json({ error: 'User not found' }); 
  //     }
  
  //     user.name = name; 
  
  //     await user.save(); 
  //     // حفظ التغييرات في قاعدة البيانات
  
  //     res.status(200).json(user);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).json({ error: 'Failed to update user' }); 
  //   }
  // });

  
// router.put('/:id',fileUpload().single('image'),async (req, res) => {
//   const { id } = req.params;
//   const user = await UserModel.findOne({ where: { id } });
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }
//   // اذا موجود

//   const {secure_url} =await cloudinary.uploader.upload(req.file.path);
//   user.profilePic = secure_url;
//   await user.save();
//    return res.status(200).json({massage:"success"});
//  });
  export default router;