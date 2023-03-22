import { Favorite } from "../models";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    return await Favorite.create({ userId, courseId });
  },

  delete: async (userId: number, courseId: number) => {
    return await Favorite.destroy({ where: { userId, courseId } });
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
      userId,
      courses: favorites.map((e) => e.Course),
    };
  },
};
