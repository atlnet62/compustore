import express from "express";
import {
    selectProduct,
    checkForm,
    removeProduct,
    editProduct,
    addProduct,
    allProduct,
    selectProductByCategory,
    addImage,
} from "../controllers/product.js";
import adminOnly from "../middlewares/adminOnly.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", allProduct); // visitor + user + admin
router.get("/search/:title", selectProduct); //visitor + user + admin
router.get("/filter/:categoryID", selectProductByCategory);
router.post("/add", auth, adminOnly, addProduct); //admin
router.get("/:mode/:productID?", auth, adminOnly, checkForm); //admin
router.patch("/edit/:productID", auth, adminOnly, editProduct); //admin
router.delete("/remove/:productID", auth, adminOnly, removeProduct); //admin
router.post("/image/add", auth, adminOnly, addImage); //admin

export default router;
