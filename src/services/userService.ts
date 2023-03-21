import { User } from "../models";
import { UserCreationAttributes } from "../models/User";

export const userService = {
  findByEmail: async (email: string) => {
    return await User.findOne({ where: { email } });
  },

  create: async (attributes: UserCreationAttributes) => {
    return await User.create(attributes);
  },
};
