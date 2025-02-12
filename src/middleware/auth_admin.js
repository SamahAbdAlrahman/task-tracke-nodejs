
import jwt from 'jsonwebtoken';
// اتاكد انه ادمن
const auth_admin=()=>{
    return (req,res,next) => {
  const {token} = req.headers;
      
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }
           
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      console.log("Decoded token:", decoded); //  محتويات التوكين
  
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.id = decoded.id;
      next();
}
    }
export default auth_admin;