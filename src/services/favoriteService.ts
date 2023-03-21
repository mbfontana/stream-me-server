import { Favorite } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    return await Favorite.create({ userId, courseId });
  },
};
