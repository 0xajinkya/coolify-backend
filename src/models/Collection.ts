import {
  DataTypes,
  BelongsToGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  HasManyGetAssociationsMixin,
} from "@sequelize/core";
import {
  Attribute,
  BelongsTo,
  Default,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { User } from "./User";
import { Post } from "./Post";

export type CollectionPermission = "private" | "public" | "unlisted";

@Table({ schema: "public" })
export class Collection extends Model<
  InferAttributes<Collection>,
  InferCreationAttributes<Collection>
> {
  @Attribute(DataTypes.STRING)
  @PrimaryKey
  @NotNull
  declare id: string;

  @Attribute(DataTypes.STRING(128))
  @NotNull
  declare name: string;

  @Attribute(DataTypes.ENUM("private", "public", "unlisted"))
  @Default("private")
  declare permission?: CollectionPermission;

  @Attribute(DataTypes.STRING(10000))
  declare description?: string;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  declare createdAt?: Date;

  @Attribute(DataTypes.DATE)
  @Default(new Date())
  declare updatedAt?: Date;

  declare owner?: NonAttribute<User>;
  @Attribute(DataTypes.STRING)
  @NotNull
  declare ownerId: string;
  declare getOwner: BelongsToGetAssociationMixin<User>;

  @HasMany(() => Post, {
    foreignKey: "collectionId",
    inverse: {
      as: "collection",
    },
  })
  declare posts?: NonAttribute<Post[]>;
  declare getPosts: HasManyGetAssociationsMixin<Post>;
}
