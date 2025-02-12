import { ConnectionDB } from "../DB/connection.js";  
import adminRouter from './modules/user/admin.router.js';  
import authRouter from './modules/auth/auth.router.js'; 
import userRouter from './modules/user/user.router.js';  

const initApp = (app, express) => {
    ConnectionDB(); 
app.use(express.json());  
  app.use('/admin', adminRouter); 
  app.use('/auth', authRouter); 
  app.use('/user', userRouter);
};

export default initApp;