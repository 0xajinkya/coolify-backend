import { ValidationChain, body, header, param } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createCollectionVal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationRules: ValidationChain[] = [
    body("name")
      .exists()
      .isString()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long."),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string if provided."),
    header("Authorization")
      .exists()
      .withMessage("Authorization header is required."),
  ];

  await Promise.all(validationRules.map((rule) => rule.run(req)));
  next();
};
