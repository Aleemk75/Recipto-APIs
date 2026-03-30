import express from "express";
const router = express.Router();
import { bulkCreate, bulkUpdate } from "../controllers/user.controller.js";

router.post("/bulk-create", bulkCreate);
router.patch("/bulk-update", bulkUpdate);

export default router;
