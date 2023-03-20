import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const courseController = {
  // GET - /courses/:id
  episodes: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const courseDetails = await courseService.findCourseDetails(Number(id));
      return res.json(courseDetails);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },
};
