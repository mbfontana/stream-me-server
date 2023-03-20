import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// Category Associations
Category.hasMany(Course);

// Course Associations
Course.belongsTo(Category);
Course.hasMany(Episode);

// Episode Associations
Episode.belongsTo(Course);

export { Category, Course, Episode, User };
