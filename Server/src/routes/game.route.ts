import { Router } from "express";
import gameController from "../controllers/game.controller";

const router = Router();

router.post("/", gameController.saveGame);
router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);

export default router;
