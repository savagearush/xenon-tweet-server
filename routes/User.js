import { Router } from "express";
import { register, login, contact } from "../controllers/User.js";

import auth from "../middleware/auth.js";
const route = Router();

route.post("/register", register);

route.post("/login", login);

route.post("/contact", contact);

export default route;
