import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const courseController = {
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

  // GET - /courses/featured
  featured: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.findFeatured();
      return res.json(courses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },
};
