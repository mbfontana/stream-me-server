import { Request, Response } from "express";
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

  
};
