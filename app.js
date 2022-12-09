import * as dotenv from "dotenv";
import config from "config";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import authorization from "./middleware/authorization.js";

dotenv.config();
const app = express();
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!config.get("jwtPrivateKey")) {
  console.error("FATAl ERROR: jwtPrivateKey is not set");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/blood-donors", connectionParams)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.error("Connection failed", err);
  });

// Middleware:
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", authorization, userRouter);

app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT} port`);
});
