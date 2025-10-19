import express from "express";
import { createFinance, getFinances } from "../controllers/financeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFinance);
router.get("/", protect, getFinances);


export default router;

