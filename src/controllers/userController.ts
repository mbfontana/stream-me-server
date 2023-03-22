import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const userController = {
  //GET - /watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const keepWatching = await userService.getKeepWatchingList(userId);
      return res.status(200).json(keepWatching);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to stream video.");
    }
  },
};
