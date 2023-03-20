import { Request, Response } from "express";
import getPaginationParams from "../helpers/getPaginationParams";
import { categoryService } from "../services/categoryService";

export const categoryController = {
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const paginatedCategories = await categoryService.findAllPaginated(
        page,
        perPage
      );
      return res.json(paginatedCategories);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },

  courses: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const coursesFromCategory = await categoryService.findCategoryWithCourses(
        Number(id)
      );
      return res.json(coursesFromCategory);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      throw new Error("Unknown error while trying to query the database.");
    }
  },
};
