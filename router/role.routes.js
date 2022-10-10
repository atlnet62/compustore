import express from "express";
import {
    removeRole,
    checkForm,
    editRole,
    addRole,
    allRole,
} from "../controllers/role.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", allRole); //admin
router.post("/add", addRole); //admin
router.get("/:mode/:roleID?", checkForm); //admin
router.patch("/edit/:roleID", editRole); //admin
router.delete("/remove/:roleID", removeRole); //admin

export default router;
