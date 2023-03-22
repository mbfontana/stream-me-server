import { Request, Response } from "express";
import getPaginationParams from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth";
import { courseService } from "../services/courseService";
import { favoriteService } from "../services/favoriteService";
import { likeService } from "../services/likeService";

export const courseController = {
  // GET - /courses/featured
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.findFeatured();
      return res.json(featuredCourses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },

  // GET - /courses/releases
  releases: async (req: Request, res: Response) => {
    try {
      const releasedCourses = await courseService.findReleases();
      return res.json(releasedCourses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },

  // GET - /courses/:id
  details: async (req: AuthenticatedRequest, res: Response) => {
    const courseId = req.params.id;
    const userId = req.user!.id;
    try {
      const course = await courseService.findByIdWithEpisodes(
        userId,
        Number(courseId)
      );

      if (!course) {
        res.status(404).json({ mesasge: "Course not found." });
      } else {
        const liked = await likeService.isLiked(userId, Number(courseId));
        const favorited = await favoriteService.isFavorited(
          userId,
          Number(courseId)
        );
        return res.json({ course, favorited, liked });
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },

  // GET - /courses/search
  search: async (req: Request, res: Response) => {
    const { search } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof search !== "string")
        throw new Error("Search param must be o type string.");

      const foundCourses = await courseService.findByName(
        search,
        page,
        perPage
      );
      return res.json(foundCourses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },

  // GET - /courses/popular
  topTen: async (req: Request, res: Response) => {
    try {
      const topTen = await courseService.findTopTenByLikes();
      return res.json(topTen);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },
};
