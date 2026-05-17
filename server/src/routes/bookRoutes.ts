import { Router } from "express";
import bookController from "@controllers/bookController";

const router = Router();

router.post("/", bookController.create);
router.get("/", bookController.list);
router.get("/:id", bookController.show);
router.delete("/:id", bookController.remove);

export default router;
