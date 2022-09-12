import express from "express";
import { pageNotFound } from "../controllers/index.js";
import userRoutes from './user.routes.js';

const router = express.Router();

router.use("/api/v1/user", userRoutes);

router.all("/*", pageNotFound);

export default router;