import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  Attribute,
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { Userv2 } from ".";

@Table({ schema: "public" })
export class UserToken extends Model<
  InferAttributes<UserToken>,
  InferCreationAttributes<UserToken>
> {
  @Attribute(DataTypes.STRING)
  @PrimaryKey
  declare id: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare purpose: "forgot-password" | "verify-email";

  @Attribute(DataTypes.STRING)
  @NotNull
  declare value: string;

  @Attribute(DataTypes.DATE)
  declare expiresAt: Date | null;

  @BelongsTo(() => Userv2, "userId")
  declare user?: NonAttribute<Userv2>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare userId: string;

  @BeforeCreate
  static async setExpiry(token: UserToken) {
    const now = new Date();
    token.expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
    return;
  }
}
