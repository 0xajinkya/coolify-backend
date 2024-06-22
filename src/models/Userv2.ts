import {
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  BeforeCreate,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from "@sequelize/core/decorators-legacy";
import { IsEmail } from "@sequelize/validator.js";
import { hashPassword } from "../utils";
import { Collection } from "./Collection";

@Table({ schema: "public" })
export class Userv2 extends Model<
  InferAttributes<Userv2>,
  InferCreationAttributes<Userv2>
> {
  @Attribute(DataTypes.STRING)
  @PrimaryKey
  @NotNull
  declare id: string;

  @Attribute(DataTypes.STRING)
  @Default("")
  declare name?: string;

  @Attribute(DataTypes.STRING)
  @Unique
  @NotNull
  @IsEmail
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  declare createdAt?: Date;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  declare updatedAt?: Date;

  @HasMany(() => Collection, {
    foreignKey: "ownerId",
    inverse: {
      as: "owner",
    },
  })
  declare ownedCollections?: NonAttribute<Collection[]>;

  declare getOwnedCollections: HasManyGetAssociationsMixin<Collection>;

  @BeforeCreate
  static async hashPass(user: Userv2) {
    user.password = await hashPassword(user.password);
    return;
  }
}
