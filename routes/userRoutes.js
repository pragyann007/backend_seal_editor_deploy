import { Router } from "express";
import { login, register } from "../controllers/userControlers.js";
import { verifyUser } from "../middlewares/isAuth.js";
import { createCodes, deleteOneCode, getCodeOfUser, getOneCode, updateCode } from "../controllers/codeControler.js";

export const router = Router();

router.post("/register",register)
router.post("/login",login);

router.post("/create-code",verifyUser,createCodes);
router.get("/codes",verifyUser,getCodeOfUser);
router.get("/code/:codeId",verifyUser,getOneCode);
router.patch("/save-code/:codeId",verifyUser,updateCode);
router.delete("/delete-code/:codeId",verifyUser,deleteOneCode);


