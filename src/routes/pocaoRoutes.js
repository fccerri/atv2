import { Router } from "express";
import { listar, buscarPorId, criar, remover } from "../controllers/pocaoController.js";

const router = Router();

router.get("/", listar);
router.get("/:id", buscarPorId);
router.post("/", criar);
router.delete("/:id", remover);

export default router;
