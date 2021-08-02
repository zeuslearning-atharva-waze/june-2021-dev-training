import cors from "cors";
import express from "express";
import { appPORT } from "./config";
import WalkinController from "./controllers/WalkinController";
import walkinRouter from "./routes/Walkin";
import argon2 from "argon2";
import { connectToChannel } from "./rabbitMQ";

const PORT = appPORT;

const wc = new WalkinController();
wc.syncUsers();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("app listening on port", PORT);
});

// walkin routes
app.use("/walkin", walkinRouter);

process.on("beforeExit", () => {
  console.log("closing");
  connectToChannel().then((c) => {
    c?.close();
  });
});
