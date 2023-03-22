import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

// Category Associations
Category.hasMany(Course, { as: "courses" });

// Course Associations
Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Episode, { as: "episodes" });
Course.hasMany(Favorite, { as: "favoriteUsers", foreignKey: "course_id" });

// Episode Associations
Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime });

// User Associations
User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episode, { through: WatchTime });
User.hasMany(Favorite, { as: "favoriteCourses", foreignKey: "user_id" });

// Favorite Associations
Favorite.belongsTo(Course);
Favorite.belongsTo(User);

export { Category, Course, Episode, User, Favorite, Like, WatchTime };
