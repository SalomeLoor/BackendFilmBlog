import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";

export const CommetsModel = sequelize.define(
  "commets",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    commet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
  },
  {
    timestamps: true,
  }
);

//agg relacion entre user y coment
UserModel.hasMany(CommetsModel, {foreignKey: "user_id"});
CommetsModel.belongsTo(UserModel,{foreignKey: "user_id"} );

