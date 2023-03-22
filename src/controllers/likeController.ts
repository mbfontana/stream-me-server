import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";

export const likeController = {
  // POST - /likes
  save: async (req: AuthenticatedRequest, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user!.id;

    try {
      const like = await likeService.create(userId, Number(courseId));
      res.status(201).json(like);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to add new favorite course.");
    }
  },

  // DELETE - /likes
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user!.id;

    try {
      await likeService.delete(userId, Number(courseId));
      res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to add new favorite course.");
    }
  },
};
