import { Like } from "../models";

export const likeService = {
  create: async (userId: number, courseId: number) => {
    return await Like.create({ userId, courseId });
  },
  delete: async (userId: number, courseId: number) => {
    return await Like.destroy({ where: { userId, courseId } });
  },
  isLiked: async (userId: number, courseId: number) => {
    const like = await Like.findOne({ where: { userId, courseId } });
    return like !== null;
  },
};
