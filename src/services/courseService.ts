import { Course } from "../models";

export const courseService = {
  findByIdWithEpisodes: async (id: number) => {
    const courseDetails = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        separate: true,
      },
    });
    return courseDetails;
  },

  findFeatured: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { featured: true },
    });
    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random() // Get a random ordered list every query
    );
    return randomFeaturedCourses.slice(0, 3);
  },

  findReleases: async () => {
    const releasedCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      limit: 10,
      order: [["created_at", "DESC"]],
    });
    return releasedCourses;
  },
};
