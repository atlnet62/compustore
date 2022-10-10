import express from "express";
import {
    removeCategory,
    checkForm,
    editCategory,
    addCategory,
    allCategory,
} from "../controllers/category.js";
import adminOnly from "../middlewares/adminOnly.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", allCategory); //user + admin
router.post("/add", auth, adminOnly, addCategory); //admin
router.get("/:mode/:categoryID?", auth, adminOnly, checkForm); //admin
router.patch("/edit/:categoryID", auth, adminOnly, editCategory); //admin
router.delete("/remove/:categoryID", auth, adminOnly, removeCategory); //admin

export default router;
