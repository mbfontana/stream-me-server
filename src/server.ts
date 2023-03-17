import express from "express";
import { adminJs, adminJsRouter } from "./admin";
import { database } from "./database";

const app = express();

app.use(express.static("public"));
app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await database
    .authenticate()
    .then(() => {
      console.log("Connection to database successful");
    })
    .catch((error) => {
      console.log(`Connection to database failed. Error: ${[error]}`);
    });

  console.log(`Server started successfuly at port (${PORT})`);
});
