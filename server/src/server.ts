import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());


import express from "express";
import cors from "cors";
import routes from "@routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import "@database";


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);


app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});