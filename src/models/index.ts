import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// Category Associations
Category.hasMany(Course, { as: "courses" });

// Course Associations
Course.belongsTo(Category);
Course.hasMany(Episode, { as: "episodes" });

// Episode Associations
Episode.belongsTo(Course);

export { Category, Course, Episode, User };
