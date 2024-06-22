import {
    BelongsToGetAssociationMixin,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
  } from "@sequelize/core";
  import {
    Attribute,
    BelongsTo,
    Default,
    NotNull,
    PrimaryKey,
    Table,
  } from "@sequelize/core/decorators-legacy";
  import { User } from "./User";
  import { Collection } from "./Collection";
  
  @Table({ schema: "public" })
  export class Post extends Model<
    InferAttributes<Post>,
    InferCreationAttributes<Post>
  > {
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    declare id: string;
  
    @Attribute(DataTypes.STRING)
    @NotNull
    declare postId: string;
  
    @Attribute(DataTypes.DATE)
    @Default(new Date())
    declare createdAt?: Date;
  
    @Attribute(DataTypes.DATE)
    @Default(new Date())
    declare updatedAt?: Date;

    declare collection?: NonAttribute<Collection>;
    @Attribute(DataTypes.STRING)
    @NotNull
    declare collectionId: string;
  
    declare getCollection: BelongsToGetAssociationMixin<Collection>;
  }
  