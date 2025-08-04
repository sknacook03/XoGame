
import express from "express";
import cors from "cors";
import indexRoutes from "./src/index.route.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", indexRoutes);

export default app;
