import { Model, DataTypes, Optional } from "sequelize";
import { database } from "../database";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";

export interface Like {
  userId: number;
  courseId: number;
}

export interface LikeInstance extends Model<Like>, Like {}

export const Like = database.define<LikeInstance, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "User", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "Course", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
