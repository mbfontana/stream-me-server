import express from "express";
import { authController } from "./controllers/authController";
import { categoryController } from "./controllers/categoryController";
import { courseController } from "./controllers/courseController";
import { episodeController } from "./controllers/episodeController";
import { favoriteController } from "./controllers/favoriteController";
import { likeController } from "./controllers/likeController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoryController.index);
router.get("/categories/:id", ensureAuth, categoryController.courses);

router.get("/courses/featured", ensureAuth, courseController.featured);
router.get("/courses/search", ensureAuth, courseController.search);
router.get("/courses/popular", ensureAuth, courseController.topTen);
router.get("/courses/releases", courseController.releases);
router.get("/courses/:id", ensureAuth, courseController.details);

router.get("/episodes/stream", ensureAuthViaQuery, episodeController.stream);

router.get("/favorites", ensureAuth, favoriteController.index);
router.post("/favorites", ensureAuth, favoriteController.save);
router.delete("/favorites", ensureAuth, favoriteController.delete);

router.post("/likes", ensureAuth, likeController.save);
router.delete("/likes", ensureAuth, likeController.delete);

export { router };
