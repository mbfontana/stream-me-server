import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoriteController = {
  // POST - /favorites
  save: async (req: AuthenticatedRequest, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user!.id;

    try {
      const favorite = await favoriteService.create(userId, Number(courseId));
      res.status(201).json(favorite);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to add new favorite course.");
    }
  },
};
