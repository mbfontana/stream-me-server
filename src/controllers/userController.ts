import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const userController = {
  // GET - /users/account
  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    try {
      const userDetails = await userService.getUserById(userId);
      return res.status(200).json(userDetails);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to fetch user.");
    }
  },

  // PUT - /users/account
  update: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, phone, birth, email } = req.body;

    try {
      const updatedUser = await userService.update(userId, {
        firstName,
        lastName,
        phone,
        birth,
        email,
      });
      return res.status(200).json(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to update profile.");
    }
  },

  // PUT - /users/account/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { currentPassword, newPassword } = req.body;

    user.checkPassword(currentPassword, async (err, isSame) => {
      try {
        if (err) throw err;
        if (!isSame) throw new Error("Incorrect password.");

        await userService.updatePassword(user.id, newPassword);
        return res.status(204).send();
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
        throw new Error("Unknown error while trying to update password.");
      }
    });
  },

  // GET - /users/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const keepWatching = await userService.getKeepWatchingList(userId);
      return res.status(200).json(keepWatching);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to fetch watch times.");
    }
  },
};
