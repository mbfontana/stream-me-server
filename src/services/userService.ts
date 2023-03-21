import { User } from "../models";
import { UserCreationAttributes } from "../models/User";
import bcrypt from "bcrypt";

export const userService = {
  findByEmail: async (email: string) => {
    return await User.findOne({ where: { email } });
  },

  create: async (attributes: UserCreationAttributes) => {
    return await User.create(attributes);
  },

  login: async (email: string, password: string) => {
    const user = await userService.findByEmail(email);

    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) return user;
    }

    return false;
  },
};
