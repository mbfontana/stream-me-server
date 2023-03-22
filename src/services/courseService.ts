import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
  // Method to find a course by its ID and return its episodes
  findByIdWithEpisodes: async (userId: number, id: number) => {
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

  // Method to find fetured courses
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

  // Method to find the newest added courses
  findReleases: async () => {
    const releasedCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      limit: 10,
      order: [["created_at", "DESC"]],
    });

    return releasedCourses;
  },

  // Method to find courses by their names
  findByName: async (search: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: { name: { [Op.iLike]: `%${search}%` } },
      limit: perPage,
      offset,
    });

    return {
      courses: rows,
      page,
      perPage,
      total: count,
    };
  },

  findTopTenByLikes: async () => {
    const query = await Course.sequelize?.query(
      `
      SELECT courses.id, courses.name, courses.synopsis,  courses.thumbnail_url, COUNT(users.id) as likes
      FROM courses
      LEFT OUTER JOIN likes ON courses.id = likes.course_id
      INNER JOIN users ON users.id = likes.user_id
      GROUP BY courses.id, likes.course_id
      ORDER BY likes DESC
      LIMIT 10;
      `
    );
    return query ? query[0] : null;
  },
};
