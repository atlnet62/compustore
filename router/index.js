import express from "express";
import {homePage, pageNotFound} from "../controllers/index.js";

/* import des middlewares admin et user */

const router = express.Router();

router.get("/api/v1/home", homePage);


router.all("/*", pageNotFound);

export default router;