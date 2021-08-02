import cors from "cors";
import express from "express";
import { appPORT } from "./config";
import userRouter from "./routes/User";
import argon2 from "argon2";
import { connectToChannel } from "./rabbitMQ";
const PORT = appPORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("app listening on port", PORT);
});

// walkin routes

//user routes
app.use("/user", userRouter);

//argon2.hash("ishigami").then((r) => console.log(r));

process.on("beforeExit", () => {
  console.log("closing");
  connectToChannel().then((c) => {
    c?.close();
  });
});
