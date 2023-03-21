import { Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export const authController = {
  // POST - /auth/register
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
      throw new Error("Unknown error while trying to register user.");
    }
  },

  // POST - /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not registered." });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) return res.status(400).json({ message: err });
        if (!isSame) return res.status(401).json({ message: "Incorrect password." });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };
        const token = jwtService.signToken(payload, "1d");

        return res.json({ authenticated: true, ...payload, token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to login user.");
    }
  },
};
