import express  from "express";
import { register } from "../app/controllers/user.controller";
import { login } from "../app/controllers/user.controller";
import './passport';
import passport from 'passport';
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

export default router
