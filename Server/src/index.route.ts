import { Router } from "express";
import gameRoutes from "./routes/game.route.ts";

const router = Router();
router.use("/games", gameRoutes);

export default router;