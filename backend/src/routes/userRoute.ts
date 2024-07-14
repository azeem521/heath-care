import { Router } from "express";
import { signUp } from "../controllers/userController";


const router = Router();

router.post('/register', signUp);


export default router;