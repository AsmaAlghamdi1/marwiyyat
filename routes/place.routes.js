import express from "express";
import { getPlace } from "../controllers/place.controller.js";

const router = express.Router();

router.get("/", getPlace);

export default router;