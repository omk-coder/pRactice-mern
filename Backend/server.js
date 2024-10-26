import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import DocsRoutes from "./routes/Docs.route.js";
import AuthRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}));

app.use("/api/auth", AuthRoutes);

app.use("/docs", DocsRoutes);

app.get("/", (req, res) => {
  res.send('Api running successfully');
});

//middleware and handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});

const Port = process.env.PORT ||4000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(Port, () => {
      console.log(`Connected to ${Port}`);
    })
  )
  .catch((err) => console.log(err));
