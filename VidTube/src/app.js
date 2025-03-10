import express from "express";

import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Common middlewares
app.use(express.json({ limit: "16Kb" }));

app.use(express.urlencoded({ extended: true, limit: "16Kb" }));

app.use(express.static("public"));
export { app };
