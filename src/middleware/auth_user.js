
import jwt from 'jsonwebtoken';
// اتاكد مين اليوزر
const auth_user=()=>{
    return (req,res,next) => {
        try{ 
  const {token} = req.headers;
      
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  req.user = decoded;  
  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "User not found or invalid token." });
  }
      next();
    }catch (error) {
        console.error("Error in auth_user:", error);
        res.status(400).json({ message: "Invalid token." });
      }
}
    }
export default auth_user;