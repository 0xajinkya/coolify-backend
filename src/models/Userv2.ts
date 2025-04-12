import {
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "@sequelize/core";
import {
  AfterCreate,
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
import { generateStrongOTP, hashPassword } from "../utils";
import { Collection } from "./Collection";
import { UserToken } from "./UserToken";
import { Snowflake } from "@theinternetfolks/snowflake";
import { verifyEmailTemplate } from "../template";
import { sendEmail } from "../providers";

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

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare verified?: boolean;

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

  @AfterCreate
	static async sendEmailMdw(user: Userv2) {
		try {
			const token = await UserToken.create({
        id: Snowflake.generate(),
				purpose: "verify-email",
				value: generateStrongOTP(),
				userId: user.get("id")
			});
			//console.log(token);
			const { subject, email } = verifyEmailTemplate(token!.value, user!.name as string);
			const emailRes = await sendEmail(user.get("email"), subject, email);
			//console.log(emailRes);
		} catch (error) {
			console.log(error);
		}
	}
}
