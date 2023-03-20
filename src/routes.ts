import express from "express";
import { categoryController } from "./controllers/categoryController";
import { courseController } from "./controllers/courseController";

const router = express.Router();

router.get("/categories", categoryController.index);
router.get("/categories/:id", categoryController.courses);

router.get("/courses/featured", courseController.featured);
router.get("/courses/search", courseController.search);
router.get("/courses/releases", courseController.releases);
router.get("/courses/:id", courseController.episodes);

export { router };
