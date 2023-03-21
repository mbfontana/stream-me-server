import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
  // GET - /auth/register
  register: async (req: Request, res: Response) => {
    const attributes = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(attributes.email);

      if (userAlreadyExists) {
        throw new Error("Email already registered.");
      }

      const newUser = await userService.create({ ...attributes, role: "user" });
      res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to stream video.");
    }
  },

  // GET - /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = userService.login(email, password);

      if (user) {
        res.status(200).json(user);
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to stream video.");
    }
  },
};
