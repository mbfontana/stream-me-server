import { Like } from "../models";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    return await Like.create({ userId, courseId });
  },
  delete: async (userId: number, courseId: number) => {
    return await Like.destroy({ where: { userId, courseId } });
  },
};
