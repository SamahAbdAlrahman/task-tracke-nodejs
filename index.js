import express from "express";
import initApp from "./src/index.router.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
// const port = 3000;
app.use(express.json());
initApp(app,express);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at : ${process.env.PORT}`);
});


