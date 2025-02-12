import { DataTypes } from "sequelize";
import sequelize from "../connection.js"; 
const UserModel = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user',  
      allowNull: false, 
    },
    
}, {
  timestamps: false, 
});
export { UserModel };
