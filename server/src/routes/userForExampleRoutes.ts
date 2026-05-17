 import { Router } from "express";

 import userForExampleController from "@controllers/userForExampleController";

 const router = Router();

 router.post("/", userForExampleController.create);
 router.get("/", userForExampleController.list);
 router.get("/:id", userForExampleController.show);
 router.delete("/:id", userForExampleController.remove);

 export default router;