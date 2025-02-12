import { DataTypes } from "sequelize";
import sequelize from "../connection.js"; 
import { UserModel } from "./users.js"; 

const taskModel = sequelize.define('task', {
  task_id: {
    type: DataTypes.INTEGER,  
    primaryKey: true,  
    autoIncrement: true, 
  },
  title: {
    type: DataTypes.STRING(50), 
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  dueDate:{
    type: DataTypes.STRING(50),
    allowNull: false,

  },
  isCompleted: {  
    type: DataTypes.BOOLEAN, 
    defaultValue: false,
    allowNull: false,

  },
  priority: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1, 2]], 
    },
  },
}, {
  timestamps: true, 
});

UserModel.hasMany(taskModel, { foreignKey: "user_id", onDelete: "CASCADE" });
taskModel.belongsTo(UserModel) ,{ foreignKey: "user_id"};
export default taskModel; 