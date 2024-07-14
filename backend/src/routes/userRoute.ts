import { Router } from "express";
import { signUp, signIn } from "../controllers/userController";


const router = Router();

router.post('/register', signUp);
router.post('/sign-in', signIn);


export default router;