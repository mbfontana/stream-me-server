import { Request, Response } from "express";
import getPaginationParams from "../helpers/getPaginationParams";
import { courseService } from "../services/courseService";

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
  episodes: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const course = await courseService.findByIdWithEpisodes(Number(id));
      return res.json(course);
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
};
