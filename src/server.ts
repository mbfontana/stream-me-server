import express from "express";
import cors from "cors";
import { adminJs, adminJsRouter } from "./admin";
import { database } from "./database";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(adminJs.options.rootPath, adminJsRouter);
app.use(router);

const PORT = process.env.PORT || 3000;

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
