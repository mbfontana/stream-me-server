import { AuthenticationOptions } from "@adminjs/express";
import { User } from "../models";
import bcrypt from "bcrypt";

export const autheticationOptions: AuthenticationOptions = {
  authenticate: async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (user && user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) return user;
    }

    return false;
  },
  cookiePassword: "generic-cookie-password",
};
