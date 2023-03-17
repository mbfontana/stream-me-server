import express from "express";
import { sequelize } from "./database";

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection to database successful");
    })
    .catch(() => {
      console.log("Connection to database failed. ");
    });
  console.log(`Server started successfuly at port (${PORT})`);
});
