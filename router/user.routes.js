import express from "express";
import {
    signup,
    signin,
    selectUser,
    removeUser,
    checkForm,
    editUser,
    addUser,
    allUser,
    updateValidatedEmail
} from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/checkToken", auth, selectUser);

router.patch("/validateAccount/:uuid", updateValidatedEmail);

router.get("/all", allUser); //admin
router.post("/add", addUser); //admin
router.get("/:mode/:userUUID?", checkForm); //user + admin
router.patch("/edit/:userUUID", editUser); //user + admin
router.delete("/remove/:userUUID", removeUser); //admin

export default router;

// userUUID = exit to separe the user to delete and the user connected (request.params.uuid !== request.params.userUUID)
