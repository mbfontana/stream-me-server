import { Model, DataTypes } from "sequelize";
import { database } from "../database";

export interface WatchTime {
  userId: number;
  episodeId: number;
  seconds: number;
}

export interface WatchTimeInstance extends Model<WatchTime>, WatchTime {
  updatedAt: Date;
}

export const WatchTime = database.define<WatchTimeInstance, WatchTime>(
  "WatchTime",
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "User", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    episodeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: { model: "Course", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    seconds: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }
);
