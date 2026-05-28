import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

import express from "express";
import routes from "@routes";
import { errorHandler } from "./middlewares/errorHandler";
import "@database";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Libera acesso para qualquer site
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});
