import { Sequelize } from "sequelize";


const sequelize = new Sequelize('testdb', 'root', '', {
    host: 'localhost',
    dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  export const ConnectionDB=()=>{
// sequelize.sync({force: true})
sequelize.sync()
 .then(() => {
    console.log('successfully!');
  })
  .catch((error) => {
    console.error('error:', error);
  });
  };

  export default sequelize;
