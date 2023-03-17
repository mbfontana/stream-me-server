import { Category } from "./Category";
import { Course } from "./Course";

// Database Associations
Category.hasMany(Course);
Course.belongsTo(Category);

export { Category, Course };
